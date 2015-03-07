Benchmark of Restify and Hapi
=============================

# Benchmarks

```
> Benchmarking restify.js

  Testing 4000 routes

  ...

> Benchmarking hapi.js

  Testing 4000 routes

  ...

```


# Run in a instance restify server

```
node restify.js
```

# Run in a different instance hapi server

```
node hapi.js
```


# Set the appropriate configuration in .benchmarkrc (ignored by git)

```
{
	ports: {
		restify: 3000,
		hapi: 4000
	},
	servers: {
		restify: 'http://localhost:3000/',
		hapi: 'http://localhost:4000/',
	},
	routes: 10
	
}
```

# Run in a different instance benchmark script

```
node benchmark.js
```