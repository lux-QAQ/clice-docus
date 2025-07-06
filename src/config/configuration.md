# Configuration

This is the document of clice's configuration.

## Server

| Name                   | Type      | Default |
| ---------------------- | --------- | ------- |
| `server.moduleSupport` | `boolean` | `false` |

Whether to enable module support.

| Name                | Type      | Default |
| ------------------- | --------- | ------- |
| `server.overSearch` | `boolean` | `true`  |

- `false`: Limits the symbol search scope to files connected through the **include graph**, which is efficient but does not handle symbols defined independently in other files.

  For example: 

  ```cpp
  /// a.h
  struct Foo {};

  /// b.cpp
  #include "a.h"
  Foo foo1;

  /// c.cpp
  #include "a.h"
  Foo foo2;
  ```

  If you look up the symbol `Foo` in `b.cpp`, the include graph guides the search path as follows: `b.cpp` -> `a.h` -> `c.cpp`. All other files are ignored. When you have a really large project, this can save a lot of time.

- `true`: Expands the search to all index files, ignoring the include graph. This is less efficient but ensures all references to a symbol can be found, even if they are not linked through `#include`.

  For example, consider the following files:

  ```cpp
  /// a.cpp 
  struct Foo {};
  Foo foo1;

  /// b.cpp
  void foo(struct Foo foo2);
  ```

  In such case, because the symbol `Foo` is independently declared in multiple files. To find all references to `Foo`, it becomes necessary to search all index files.

## Rule

`[rules]` represents that it is an array of objects. Each object has the following properties. Note that the order of rules matters. clice applies the first matching rule to the file.

#### `[rules].pattern`

| Name              | Type     |
| ----------------- | -------- |
| `[rules].pattern` | `string` |

Glob pattern for matching files. If the pattern matches the file path, clice will apply the rule to the file.

Normally, the pattern is a file path. However, you can also use the following syntax to match multiple files:

- `*`: Matches one or more characters in a path segment.
- `?`: Matches a single character in a path segment.
- `**`: Matches any number of path segments, including none.
- `{}`: Groups conditions (e.g., `**/*.{ts,js}` matches all TypeScript and JavaScript files).
- `[]`: Declares a range of characters to match in a path segment(e.g., `example.[0-9]` matches `example.0`, `example.1`, etc.).
- `[!...]`: Negates a range of characters to match in a path segment(e.g., `example.[!0-9]` matches `example.a`, `example.b`, but not `example.0`).

#### `[rules].append` & `[rules].remove`

| Name             | Type                | Default |
| ---------------- | ------------------- | ------- |
| `[rules].append` | `array` of `string` | `[]`    |
| `[rules].remove` | `array` of `string` | `[]`    |

Appends or removes arguments from the original command list. This is useful for modifying compilation flags, such as changing the C++ standard.

For example, to switch from C++11 to C++17:

```diff
# Original arguments might include "-std=c++11"
# With a rule: append = ["-std=c++17"], remove = ["-std=c++11"]

- ... -std=c++11 ...
+ ... -std=c++17 ...
```

#### `[rules].readonly`

| Name               | Type     | Default  |
| ------------------ | -------- | -------- |
| `[rules].readonly` | `string` | `"auto"` |
 
Controls whether the file is treated as readonly. Value could be one of `"auto"`, `"always"` and `"never"`.

- `"auto"`: Treats the file as readonly until you edit it.
- `"always"`: Always treats the file as readonly.
- `"never"`: Always treats the file as non-readonly.

> [!NOTE]
> Readonly means the file is not editable, and LSP requests such as code actions or completions will not be triggered on it. This avoids dynamic computation and allows pre-indexed results to be loaded directly, improving performance.

#### `[rules].header`

| Name             | Type     | Default  |
| ---------------- | -------- | -------- |
| `[rules].header` | `string` | `"auto"` |

Controls how header files are treated. Value could be one of `"auto"`, `"always"` and `"never"`.

- `"auto"`: Attempts to infer the header context first. If no header context is found, the file will be treated as a normal source file.
- `"always"`: Always treats the file as a header file. If no header context is found, errors will be reported.
- `"never"`: Always treats the file as a source file.

Header context refers to the related source files or additional metadata linked to the header file.

#### `[rules].contexts`

| Name               | Type                | Default |
| ------------------ | ------------------- | ------- |
| `[rules].contexts` | `array` of `string` | `[]`    |

Specifies extra header contexts (file paths) for the file. Normally, header contexts are inferred automatically once the file is indexed. However, if you need immediate context before indexing completes, you can provide it manually using this field.

## Cache

| Name        | Type     | Default                       |
| ----------- | -------- | ----------------------------- |
| `cache.dir` | `string` | `"${workspace}/.clice/cache"` |

Directory for storing PCH and PCM.

| Name          | Type     | Default |
| ------------- | -------- | ------- |
| `cache.limit` | `number` | `0`     |

Maximum number of cache files to keep. If the total exceeds this limit, clice deletes the oldest files automatically. Set to `0` to disable the limit. 
 
## Index

| Name        | Type     | Default                       |
| ----------- | -------- | ----------------------------- |
| `index.dir` | `string` | `"${workspace}/.clice/index"` |

Directory for storing index files.

| Name               | Type      | Default |
| ------------------ | --------- | ------- |
| `index.background` | `boolean` | `true`  |

Whether to index files in the background. If `true`, clice will index files in the background when the server is idle. If `false`, you need to send an index request to index files.

| Name                  | Type      | Default |
| --------------------- | --------- | ------- |
| `index.instantiation` | `boolean` | `true`  |

Whether to index entities inside template instantiation. For example:

```cpp
struct X { static void foo(); };
struct Y { static void foo(); };

template <typename T>
void foo() {
    T::foo(); // [!code highlight]
}

template void foo<X>();

int main() {
    foo<Y>();
}
```

If `index.instantiation` is `true`, clice will traverse declarations in template instantiation, such as `foo<X>` and `foo<Y>`, and index them. As a result, if you trigger `go-to-definition` on `foo` in `T::foo()`, clice will return the locations of `X::foo` and `Y::foo`. If `false`, `go-to-definition` will return no results.

## Feature

### Semantic Tokens

| Name                                 | Type               | Default |
| ------------------------------------ | ------------------ | ------- |
| `feature.semanticTokens.typeMap`     | `array` of `table` | `[]`    |
| `feature.semanticTokens.modifierMap` | `array` of `table` | `[]`    |

Maps the customized semantic symbol kinds or modifier to LSP semantic token types or modifiers.

::: tip Example
```toml
[feature.semanticTokens]
typeMap = [
    {"from": "header", "to": "string"},
    {"from": "attribute", "to": "decorator"},
]

modifierMap = [
    {"from": "const", "to": "readonly"},
    {"from": "pureVirtual", "to": "abstract"},
]
```
:::

> [!NOTE]
> For all clice symbol kinds, please refer to [SymbolKind](https://github.com/clice-project/clice/blob/main/include/AST/SymbolKind.h). The first letter of the name should be translated to lowercase. For all LSP semantic token types, refer to [SemanticTokenKind](https://microsoft.github.io/language-server-protocol/specifications/specification-current/#textDocument_semanticTokens).

| Name                              | Type      | Default |
| --------------------------------- | --------- | ------- |
| `feature.semanticTokens.standard` | `boolean` | `false` |

If `true`, clice will map the semantic token types and modifiers to the standard ones automatically.

### Folding Range

This section is under construction.