FROM node
RUN apt-get update \
	&& apt-get install -yq \
		curl \
		git \
		mongodb-clients \
		vim
RUN curl https://install.meteor.com/ | sh

RUN git clone https://github.com/tosdr/tosdr-build
RUN git clone https://github.com/tosdr/tosdr2

EXPOSE 3000

VOLUME [ "/tosdr-build", "/dump" ]

CMD cd /tosdr2 && git checkout dev && sh ./run.sh
