class CommentPolicy < ApplicationPolicy
  def create?
    return false if user.nil?

    user.writer_user? || user.reader_user?
  end

  def update?
    return false if user.nil?

    user.writer_user? || record.user.id == user.id
  end

  def delete?
    return false if user.nil?

    user.writer_user? || record.user.id == user.id
  end
end
