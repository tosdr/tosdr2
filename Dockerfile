FROM ubuntu
RUN apt-get update \
	&& apt-get install -yq \
		curl \
		git \
		mongodb-clients
RUN curl https://install.meteor.com/ | sh

COPY . tosdr2/
RUN git clone https://github.com/tosdr/tosdr-build

EXPOSE 3000
CMD cd tosdr2 && meteor
