class Resource < ApplicationRecord
  belongs_to :project
  belongs_to :user
end
