class PostPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user.present? && user.writer_user?
        scope.all
      else
        scope.status_published
      end
    end
  end

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
