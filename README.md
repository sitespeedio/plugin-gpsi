# sitespeed.io plugin for GPSI (Google PageSpeed Insights)
[![Build Status](https://travis-ci.org/sitespeedio/plugin-gpsi.svg?branch=master)](https://travis-ci.org/sitespeedio/plugin-gpsi)

Run GPSI as a plugin for sitespeed.io

Run by giving **--gpsi.key YOUR_GPSI_KEY** to sitespeed.io.

You can read more about sitespeed.io plugins [here](https://www.sitespeed.io/documentation/sitespeed.io/plugins/). 

Get your [GSPI key from Google](https://support.google.com/cloud/answer/6158862).

## Test with current master

If you have checked out as the same level as sitespeed.io you run it like this (else just change the path).

```bash
git clone https://github.com/sitespeedio/sitespeed.io.git
cd sitespeed.io
npm install
bin/sitespeed.js --plugins.add ../plugin-gpsi/lib/ --gpsi.key YOUR_SECRET_KEY https://www.sitespeed.io/ -n 1
```

## Run in production
If you want to run GPSI with your other sitespeed.io test, follow the instructions in the [add a plugin docs](https://www.sitespeed.io/documentation/sitespeed.io/plugins/#add-a-plugin).

## sitespeed.io version
You need sitespeed.io 6.0 or later to run the plugin.

## How do I know it works?
You will get an extra tab called GPSI on each individual URL that you test.

## GPSI vs Lighthoue
GPSI runs Lighthouse in the backend. You can see which Lighthouse version in the HTML produced by the plugin. The plugin collects accessibility, seo, pwa, best-practices and performance scores.

## Data sent to Graphite/InfluxDB
By default the plugin sends the GSPI score for the tested page for the five categories: accessibility, seo, pwa, best-practices and performance.

It also sends the loadingExperience for the page. That includes the actual percentile for First Contentful Paint and First Input Delay and the percentage of fast/moderate/slow users.

And it also sends a summary on domain level for the loading experience, meaning you can keep track of those metrics by running the plugin once a day.