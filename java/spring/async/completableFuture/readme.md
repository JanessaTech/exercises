About this demo
----------------------
This demo shows how to create a separate Thread waiting for the result from future
There are two ways to creating the separate thread:
 - Create the thread explicitly. See the CompletableFutureDemo1
 - Don't explicitly create the thread. See CompletableFutureDemo2

For the second way, we take advantage of built-in thread-pool provided by CompletableFuture by using CompletableFuture.supplyAsync
One benefit we get from this way is we can convert the result returned by original future in functional way 
