class InvitationRequestConsumer < Racecar::Consumer
  subscribes_to "test_events"

  def process(message)
    # data = JSON.parse(message.value)
    puts '===== Consumer ====='
    puts message.inspect
    puts InvitationRequest.table_name
  end
end