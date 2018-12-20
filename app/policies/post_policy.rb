class PostPolicy < ApplicationPolicy
  def create?
    return false if user.nil?

    user.writer_user?
  end

  def update?
    return false if user.nil?

    user.writer_user?
  end

  def destroy?
    return false if user.nil?

    user.writer_user?
  end
end
