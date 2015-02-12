FROM node

# build as tosdr2-pre, as the basis for tosdr-dev

RUN apt-get update \
	&& apt-get install -yq \
		curl \
		git \
		mongodb-clients \
		vim
RUN curl https://install.meteor.com/ | sh

RUN git clone https://github.com/tosdr/tosdr-build
RUN git clone https://github.com/tosdr/tosdr2
