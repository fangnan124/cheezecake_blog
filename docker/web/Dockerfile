FROM ruby:2.5.3

#RUN apt-get update -qq && apt-get install -y --no-install-recommends \
#                            apt-utils build-essential \
#                            libpq-dev cron sudo less \
#                            chrpath libssl-dev libxft-dev \
#                            libfreetype6 libfreetype6-dev \
#                            libfontconfig1 libfontconfig1-dev logrotate \
#                            libnss3 \
#                            vim \
#  && rm -rf /var/lib/apt/lists/*
#
## install Chrome (for headless-chrome UAT tests)
#RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add - \
#    && sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list' \
#    && apt-get update \
#    && apt-get install -y google-chrome-stable \
#    && rm -rf /var/lib/apt/lists/* /var/cache/apt/*
#

# Install Node & Yarn
RUN curl -sL https://deb.nodesource.com/setup_9.x | bash -
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -qqy \
    && apt-get -qqyy install nodejs yarn \
    && rm -rf /var/lib/apt/lists/*

# Copy project
RUN mkdir /cheezecake_blog
WORKDIR /cheezecake_blog
COPY . /cheezecake_blog
RUN bundle install

RUN mkdir -p /home/ec2-user/cheezecake_blog/shared
COPY /home/ec2-user/cheezecake_blog/shared /home/ec2-user/cheezecake_blog/shared

# Entrypoint
COPY ./docker/web/docker-entrypoint.sh /
ENTRYPOINT ["sh", "/docker-entrypoint.sh"]
