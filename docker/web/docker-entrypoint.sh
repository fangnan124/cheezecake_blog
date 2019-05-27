#!/bin/bash
set -e

if [ $RAILS_ENV = "production" ] || [ $RAILS_ENV = "staging" ]; then
  bundle install --without development test
  bundle exec rails assets:precompile
  yarn install --production
  # bundle exec rails webpacker:compile
  bundle exec rails db:migrate
else
  bundle install
  yarn install
fi

if [ -f /cheezecake_blog/tmp/pids/server.pid ]; then
  rm -f /cheezecake_blog/tmp/pids/server.pid
fi

#if [ $RAILS_ENV = "development" ]; then
#  bundle exec rails webpacker:clobber
#fi
#
#if [ $RAILS_ENV = "production" ] || [ $RAILS_ENV = "staging" ]; then
#  bundle exec rake sneakers:run &
#  bundle exec sidekiq -e $RAILS_ENV -d -L log/sidekiq.log -C config/initializers/sidekiq.yml
#fi

bundle exec rails s -p 3000 -b '0.0.0.0'

exec "$@"
