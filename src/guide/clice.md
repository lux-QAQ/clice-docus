# clice
<div style="display: flex; justify-content: center;">
  <img src="/assets/main-logo.jpg" alt="description" width="300" height="300"/>
</div>


## What is clice?
"More flexible, more efficient" C++ language server !!

::: details Detailed Description
A language server written in C++ that primarily supports C++ programming, following Microsoft's [LSP (Language Server Protocol)](https://learn.microsoft.com/en-us/visualstudio/extensibility/language-server-protocol?view=vs-2022). The core goal of the project is to provide functionality similar to clangd, but solve the problems of clangd's slow development and difficulty in receiving significant contributions, while also trying to better support C++20 modules and optimize certain performance/memory aspects.
:::
## Where does clice work?

```mermaid
graph TB
    subgraph "User Environment"
        VSCode[Visual Studio Code]
        OtherIDEs[Other IDEs/Editors]
    end
    
    subgraph "VSCode Extension"
        VSCodeExt[VSCode Extension<br>TypeScript]
        LangClient[Language Client<br>LSP]
    end
    
    subgraph "clice Core"
        Server[Server<br>LSP Protocol Handler<br>Session Management]
        Scheduler[Scheduler<br>Async Task Scheduler]
        CompilerModule[Compiler Module<br>Clang Wrapper, AST Generation]
        FeatureModules[Feature Modules<br>Code Completion, Highlighting, etc.]
        Indexer[Indexer<br>Background Code Indexing]
        CompilationDB[CompilationDatabase<br>Parse Compilation Commands]
    end
    
    subgraph "Dependencies"
        Clang[Clang Library<br>Syntax & Semantic Analysis]
        LLVMLibs[LLVM Libraries]
    end
    
    %% Workflow & Interactions
    VSCode --> VSCodeExt
    OtherIDEs -->|via LSP| Server
    
    VSCodeExt --> LangClient
    LangClient -->|JSON-RPC| Server
    
    Server -->|Dispatch Requests| Scheduler
    
    Scheduler -->|Get Compilation Options| CompilationDB
    Scheduler -->|Request AST| CompilerModule
    Scheduler -->|Call Feature Implementation| FeatureModules
    Scheduler -->|Trigger Background Indexing| Indexer
    
    FeatureModules -->|Consume AST| CompilerModule
    Indexer -->|Consume AST| CompilerModule
    
    CompilerModule -->|Call| Clang
    Clang --> LLVMLibs
```






## clice Makes Its Grand Entrance
Now that you understand clice, let's navigate to the directory guide to check out the tutorials and proceed with installation...configuration...

[Directory Navigation](./start-install.md)