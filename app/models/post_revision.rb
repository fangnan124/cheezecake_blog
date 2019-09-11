class PostRevision < ApplicationRecord
  belongs_to :post

  before_save do
    self.revision_number = Time.zone.now.strftime('%Y%m%d%H%M%S')
  end
end
