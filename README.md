### How to deploy? ###
#### Prerequisites ####
* Install docker
* Install docker-compose
* If you want to take advantage of automatic updates to the latest released version, it is necessary to first log in using the `sudo docker login ghcr.io` command and following instructions. (WARNING: The provided credentials are stored IN CLEAR in a configuration file called ~/.docker/config.json)
#### Running using latest docker images ####
* Clone the repository
* Run `sudo docker-compose up -d`
* View the web app using a browser of your choice at `localhost:3000` or domain name
#### Running building local version ####
* Run `sudo docker-compose up -f docker-compose-local.yml up`
* View the web app using a browser of your choice at `localhost:3000`
