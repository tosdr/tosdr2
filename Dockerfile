
FROM ubuntu

# install apache, postgres, and some basics
RUN apt-get update && apt-get install -yq \
    build-essential \
    curl \
    mongodb-clients \
    python \
    sudo \
    vim

# Replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# install nodejs using nvm
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 4

RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash \
    && source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# install meteor
RUN useradd meteor -G staff -m -s /bin/bash
USER meteor
ENV RELEASE 1.4.2.3
RUN curl ${CURL_OPTS} -o /tmp/meteor.sh https://install.meteor.com?release=${RELEASE}
RUN sh /tmp/meteor.sh

# add the tosdr2 app
ADD . /home/meteor/src
WORKDIR /home/meteor/src
USER root
RUN chown -R meteor .
USER meteor
RUN . $NVM_DIR/nvm.sh && npm install --production
ENV PATH /home/meteor/.meteor:$PATH
#USER root
#USER meteor
RUN meteor build --directory /home/meteor/app
WORKDIR /home/meteor/app
CMD meteor
