FROM tosdr2-pre
RUN cd tosdr2 && git checkout dev && git pull
RUN cd tosdr2 && meteor update

EXPOSE 80

VOLUME [ "/tosdr-build", "/data" ]

CMD cd /tosdr2 && sh ./run.sh
