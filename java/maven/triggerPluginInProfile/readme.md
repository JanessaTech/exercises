About this demo:</br>
This demo is to show how to use a profile to trigger a profile.</br>
This profile is to run a script. </br>
How to run it:</br>
1. Go this this directory and run 'mvn clean -Pintegration'. You will something like this:
```
[INFO] Scanning for projects...
[INFO]
[INFO] ------------------------------------------------------------------------
[INFO] Building triggerPluginInProfile 0.0.1-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[INFO]
[INFO] --- exec-maven-plugin:1.6.0:exec (pre-clean) @ triggerPluginInProfile ---
Hello Jane
[INFO]
[INFO] --- maven-clean-plugin:3.1.0:clean (default-clean) @ triggerPluginInProfile ---
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 2.246 s
[INFO] Finished at: 2021-12-06T22:10:10+08:00
[INFO] Final Memory: 16M/309M
[INFO] ------------------------------------------------------------------------

```

Note:
Make sure you run it on linux os. </br>
Run it in git shell you are on window os