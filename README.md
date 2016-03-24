# This application is based on "AngularJS Phone Catalog Tutorial Application"

It just add RequireJs, Grunt, Bower, Express, Jade.

# How to use

## install modules

```npm install```

```bower install```

## start server

```node app.js```

## run unit test by karma

```grunt karma:unit```


# How to deploy to Heroku

https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction

## install heroku
wget -O- https://toolbelt.heroku.com/install-ubuntu.sh | sh

## login
```
heroku login
```

## create an app on heroku
```
heroku create
git push heroku master
heroku ps:scale web=1
```

## access your website
you can get the url from above logs, or open it from below command
```
heroku open
```

## check log
```
heroku logs
```





