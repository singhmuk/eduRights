import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';


const titles = { backgroundColor: '#F0F8FF', padding: '1px', fontSize: '16px' }

const styles = theme => ({
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(1)
  },
  smMargin: {
    margin: theme.spacing(1)
  },
  actionDiv: {
    textAlign: "center"
  }
})

// const configGit = ``.trim();



class GitConcepts extends Component {
  componentDidMount() {
    setTimeout(() => Prism.highlightAll(), 0)
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <h4><Sidebar /></h4>
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <List>
              <h3>What is "bare repository" in Git?</h3>
              <ul>
                <li>Remote repositories in Git should be set up as "bare" repositories. Technically, a remote repository doesn't differ from a local one: it contains branches, commits, and tags just like a local repository.</li>
                <li>However, a local repository has a working copy associated with it: a directory where some version of your project's files is checked out for you to work with.</li>
                <li>A remote repository doesn't have such a working directory: it only consists of the bare ".git" repository folder.</li>
              </ul>

              <h3>What is the difference between "fetch" and "pull"?</h3>
              <ul>
                <li><b>git fetch:</b> Really only downloads new data from a remote repository - but it doesn't integrate any of this new data into your working files. Fetch is great for getting a fresh view on all the things that happened in a remote repository.</li>
                <li><b>git pull:</b> In contrast, not only downloads new data; it also directly integrates it into your current working copy files. You can think of pull as a combination of fetch and merge (or, alternatively, rebase).</li>
              </ul>
              <h3>What is a conflict in Git?</h3>
              This is when the same lines in the same file were changed - or when one person decided to delete the file while the other person decided to modify it. In any of these cases, Git simply cannot know what is correct. Git will then mark the file as having a conflict. The user will have to solve these conflicts before they can continue their work.
              <h3>What is a "detached HEAD" in Git? Why is it considered a "dangerous" state?</h3>
              <p>
                Almost always when you check out a revision in your repository, you do this by mentioning a branch's name: you tell Git to make this branch your current HEAD branch. However, instead of checking out a branch, you can also choose to check out a specific commit or tag.
                <br />
                <br />
                By doing this, you have put your local repository in a "Detached HEAD" state: the HEAD pointer is not on a branch, but on a specific revision.
                <br />
                <br />
                If you create additional commits in this state, they will not be associated with any branch (since no branch is currently checked out). In such a scenario, it's very easy to lose new commits.
              </p>
              <h3>What is the "Stash" in Git? In what situations can it be helpful?</h3>
              <ul>
                <li>The Stash can be described as a "clipboard" for uncommitted local changes. Putting your local changes on the Stash will result in a clean working copy, i.e. you have no more local changes.</li>
                <li>Such a "clean working copy" state is an important prerequisite for many actions in Git: e.g. before switching branches, pulling from a remote, or merging changes, you should always make sure to have a clean working copy without any local changes.</li>
                <li>Changes that were stored on the Stash can be restored later in your working copy, at any time. You can create as many Stashes as you want; you're not limited to storing only a single set of changes.</li>
              </ul>
              <h3>How can you restore a previous version of your project?</h3>
              <ul>
                <li>The fastest way to restore an old version is to use the "reset" command:
                  <br />
                  e.g: git reset --hard 0ad5a7a6
                </li>
                This will rewind your HEAD branch to the specified version. All commits that came after this version are effectively undone;
                <br />

                <li>The reset command comes with a couple of options, one of the more interesting ones being the "--soft" flag. If you use it instead of --hard, Git will keep all the changes in those "undone" commits as local modifications:
                  <br />
                  git reset --soft 0ad5a7a6
                </li>
                You'll be left with a couple of changes in your working copy and can then decide what to do with them.
              </ul>

              <h3>You committed a file and only later noticed that it actually should have been "ignored". How can you solve this?</h3>
              Git only ignores "untracked" files (these are files that haven't yet been committed to the repository). If a file was accidentally committed to the repository and shall then be ignored, you have to first untrack it; this can be done, for example, by moving it out of the repository temporarily so Git considers it "deleted". After confirming this "deletion" in a new commit, you can then move the file back and add it to the project's .gitignore list.

              <h3>You accidentally committed on the "master" branch instead of "feature/login". Describe the process of correcting this mistake.</h3>
              First, you should check out the "feature/login" branch. There, copy the desired commit over using the git cherry-pick command. Then, check out "master" again and use git reset --hard HEAD~1 to undo the (on this branch) unwanted commit.

              <h3>Why is it discouraged to us "git push --force"? What are some of the potential downsides?</h3>
              Using git push with the --force option forcefully overwrites the history on the remote with your own local commit history. Two main problems can occur:
              <ul>
                <li>Your colleagues might have based their work on the old commit history. By force pushing, you have changed this history, meaning their history is not in line with the new one anymore.</li>
                <li>If your colleagues have pushed their own work in the meantime (since you last fetched from the remote), a force push will overwrite (and thereby delete) their commits.</li>
              </ul>

              <h3>How can you undo a commit that has already been pushed to a shared branch on a remote repository?</h3>
              <ul>
                <li>First of all, using git push --force would not be a good solution in most cases. The reason for this is that force push has the potential to overwrite other's work or at least change their commit history in an unexpected way.</li>
                <li>A better, unobtrusive approach would be to use git revert, because this will not rewrite / manipulate old commit history. Instead, a new commit will be created that corrects the effects of the unwanted one(s).</li>
              </ul>

              <h3>You have accidentally deleted a branch. Is there any way to recover it and bring it back?</h3>
              <p>
                Using the git reflog command, you are able to inspect all of the recent HEAD pointer movements in this repository. If the deletion hasn't been too long ago, you should be able to find the last commit on this branch. Using that commit's SHA-1 hash, you are then able to recreate the branch.
              </p>

              <h3>What does it mean to "rewrite commit history"? Give some examples of when this can happen in Git.</h3>
              <ul>
                <li>Commit history is "rewritten" whenever existing commits are manipulated after the fact. The most important effect of this is that the manipulated commits will receive new SHA-1 hashes, making them completely new commit objects from Git's perspective. This is especially dangerous if others on a team have already based their work on this old commit history; if it's manipulated after the fact, this will cause problems.</li>
                <li>Commit history is "rewritten", for example, during a rebase, interactive rebase, or when amending the very last commit.</li>
              </ul>

              <h3>What is a Rebase in Git?</h3>
              <ul>
                <li>Just like a merge, rebase is a way of integrating commits from another branch into the current HEAD branch. In contrast to merge, however, it does not produce a so-called merge commit. Instead, rebase produces a straight line of commit history without the "melting point" commit that is so typical for merge.</li>
                <li>Rebase achieves this by temporarily putting aside any new commits that happened after the branches diverged. Then, any new commits from the base branch are applied to the HEAD branch; at this point, both branches look identical. Only then are the temporarily removed commits (the actual new commits that happened on the HEAD branch) reapplied (or "re-based").</li>
              </ul>

              <h3>What is meant by "long-running" or "long-lived" branches in Git?</h3>
              <ul>
                <li>Technically, all branches in Git work in the same way. Conceptually, however, many teams make a distinction between "long-running" and "short-lived" branches.</li>
                <li>Long-running branches are meant to remain in the repository during its complete lifetime. They are typically branches that are shared among the whole team and are being merged into from other, short-lived branches.</li>
                <li>Those short-lived branches are typically related to feature development or bugfixes. When work on these branches is completed, they are merged into a long-running branch and then deleted.</li>
              </ul>

              <h3>What are Submodules in Git?</h3>
              A "Submodule" is a standard Git repository. Its only specialty is that it's nested inside another, parent Git repository. The most common use case for them is when including a code library. You can simply add the library as a Submodule in your main project. A Submodule remains a fully functional Git repository: you can modify files, commit, pull, push, etc. from inside it like in any other repository.

              <h3>What is Git fork? What is difference between fork, branch and clone?</h3>
              <ul>
                <li><b>Fork:</b> is a remote, server-side copy of a repository, distinct from the original. A fork isn't a Git concept really, it's more a political/social idea.</li>
                <li><b>Clone:</b> is not a fork; a clone is a local copy of some remote repository. When you clone, you are actually copying the entire source repository, including all the history and branches.</li>
                <li><b>Branch:</b> is a mechanism to handle the changes within a single repository in order to eventually merge them with the rest of code. A branch is something that is within a repository. Conceptually, it represents a thread of development.</li>
              </ul>

              <h3>Tell me the difference between HEAD, working tree and index, in Git?</h3>
              <ul>
                <li>The working tree/working directory/workspace is the directory tree of (source) files that you see and edit.</li>
                <li>The index/staging area is a single, large, binary file in baseOfRepo/.git/index, which lists all files in the current branch, their sha1 checksums, time stamps and the file name - it is not another directory with a copy of files in it.</li>
                <li>HEAD is a reference to the last commit in the currently checked-out branch.</li>
              </ul>

              <h3>Could you explain the Gitflow workflow?</h3>
              <p>Gitflow workflow employs two parallel long-running branches to record the history of the project, master and develop:</p>
              <ul>
                <li><b>Master -</b> is always ready to be released on LIVE, with everything fully tested and approved (production-ready).</li>
                <li><b>Hotfix -</b> Maintenance or “hotfix” branches are used to quickly patch production releases. Hotfix branches are a lot like release branches and feature branches except they're based on master instead of develop.</li>
                <li><b>Develop -</b> is the branch to which all feature branches are merged and where all tests are performed. Only when everything’s been thoroughly checked and fixed it can be merged to the master.</li>
                <li><b>Feature -</b> Each new feature should reside in its own branch, which can be pushed to the develop branch as their parent one.</li>
              </ul>

              <h3>What’s the language used in Git?</h3>
              Git uses the “C” language. The most probable follow-up would then be “why?”. It is quite simply the “C” language that allows Git to be exceptionally fast - something that would be very hard to achieve with some of the more high-tier programming languages.

              <h3>Can you name other Git repository hosting services?</h3>
              <ul>
                <li>Pikacode</li>
                <li>GitEnterprise</li>
                <li>SourceForge.net</li>
                <li>Visual Studio Online</li>
              </ul>

              <h3>What is ‘Git CONFIG’ used for?</h3>
              The git config is a command can be used to configure most of the options that you’ll need while using Git. Whether it be user info or the way that the repository works - it becomes a very convenient method of configuration.

              <h3>Can broken commits be fixed?</h3>
              es, they can. The way that you would go about fixing a broken commit is by issuing the command git commit - amend. This command will find the broken commit and restore it’s functionality, removing the error message in the process.
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(GitConcepts));