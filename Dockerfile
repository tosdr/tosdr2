FROM ulexus/meteor
ENV RELEASE 1.4.2.3
RUN apt-get update \
&&  apt-get install -yq mongodb-clients \
&&  rm -rf /var/lib/apt/lists/*

