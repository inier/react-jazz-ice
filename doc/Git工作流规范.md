# Git 分支与版本发布规范

- 基本原则：master 为保护分支，不直接在 master 上进行代码修改和提交。

- 开发日常需求或者项目时，从 master 分支上 checkout 一个 feature 分支进行开发或者 bugfix 分支进行 bug 修复，功能测试完毕并且项目发布上线后，

  ```plain
  将feature分支合并到主干master，并且打Tag发布，最后删除开发分支
  ```

  。分支命名规范：

  - 分支版本命名规则：分支类型*分支发布时间*分支功能。比如：feature_20170401_fairy_flower
  - 分支类型包括：feature、 bugfix、refactor 三种类型，即新功能开发、bug 修复和代码重构
  - 时间使用年月日进行命名，不足 2 位补 0
  - 分支功能命名使用 snake case 命名法，即下划线命名。

- Tag 包括 3 位版本，前缀使用 v。比如 v1.2.31。Tag 命名规范：

  - 新功能开发使用第 2 位版本号，bug 修复使用第 3 位版本号
  - 核心基础库或者 Node 中间价可以在大版本发布请使用灰度版本号，在版本后面加上后缀，用中划线分隔。alpha 或者 belta 后面加上次数，即第几次 alpha：
    - v2.0.0-alpha-1
    - v2.0.0-belta-1

- 版本正式发布前需要生成 changelog 文档，然后再发布上线。

> 后续还可以，采用`@semantic-release/changelog`来根据 Commit 中 type 自动增量生成 CHANGELOG；
>
> 或者，采用 `semantic-release` 来实现全自动更新版本号和发布，该工具会判断 Commit Message 的不同，fix 增加修订号，feat 增加次版本号，而包含 BREAKING CHANGE 的提交增加大版本号。 详情查看参考文档。
