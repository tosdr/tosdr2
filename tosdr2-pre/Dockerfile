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
RUN cd tosdr2 && git checkout dev && git pull
RUN cd tosdr2 && meteor update
RUN ln -s /tosdr2/backup.sh /backup.sh
