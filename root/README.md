{%= project_name %} {% if (widget) { %}widget{% } else { %}operator{% }%}
======================

The {%= project_name %} {% if (widget) { %}widget{% } else { %}operator{% }%} is a WireCloud {% if (widget) { %}widget{% } else { %}operator{% }%} that provides ...

Build
-----

Be sure to have installed [Node.js](http://node.js){% if (bower) { %} and [Bower](http://bower.io){% }%} in your system. For example, you can install it on Ubuntu and Debian running the following commands:

```bash
curl -sL https://deb.nodesource.com/setup | sudo bash -
sudo apt-get install nodejs
sudo apt-get install npm{% if (bower) { %}
sudo npm install -g bower{% }%}
```

If you want the last version of the {% if (widget) { %}widget{% } else { %}operator{% }%}, you should change to the `develop` branch:

```bash
git checkout develop
```

Install other npm dependencies by running: (need root because some libraries use applications, check package.json before to be sure)

```bash
sudo npm install
```

For build the {% if (widget) { %}widget{% } else { %}operator{% }%} you need download grunt:

```bash
sudo npm install -g grunt-cli
```

And now, you can use grunt:

```bash
grunt
```

If everything goes well, you will find a wgt file in the `dist` folder.

## Settings

`Write here the preferences`

## Wiring


### Input Endpoints

`Write here the input wiring endpoints`


### Output Endpoints


`Write here the output wiring endpoints`

## Usage


## Reference

- [FIWARE Mashup](https://mashup.lab.fiware.org/)

## Copyright and License

Copyright (c) 2015 {%= vendor_title %}
