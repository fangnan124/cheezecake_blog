class PageController < ApplicationController
  def index
    # $kafka_producer.produce("{'a': 1, 'b': 2}", topic: "test_events")
  end
end
