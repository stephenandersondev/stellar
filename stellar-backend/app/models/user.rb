class User < ApplicationRecord
  has_many :messages
  has_many :resources 
  belongs_to :project

  has_secure_password
end
