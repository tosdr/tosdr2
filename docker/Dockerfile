FROM node
RUN apt-get update \
	&& apt-get install -yq \
		curl \
		git \
		mongodb-clients
RUN curl https://install.meteor.com/ | sh

RUN git clone https://github.com/tosdr/tosdr-build
RUN git clone https://github.com/tosdr/tosdr2

EXPOSE 3000
CMD cd tosdr2 && meteor
