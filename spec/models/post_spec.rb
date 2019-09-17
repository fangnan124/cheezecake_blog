# == Schema Information
#
# Table name: posts
#
#  id                 :bigint           not null, primary key
#  title              :string
#  content            :text
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  status             :string(20)       default("wip")
#  views              :integer          default(0), not null
#  content_plain_text :text
#

require 'rails_helper'

RSpec.describe Post, type: :model do
  describe 'sample test for CircleCI' do
    it 'should pass' do
      expect(1).to be_truthy
    end
  end
end
