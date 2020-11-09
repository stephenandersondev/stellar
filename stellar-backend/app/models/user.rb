class User < ApplicationRecord
  has_many :messages
  has_many :resources 
  belongs_to :project

  validates :username, uniqueness: { case_sensitive: false }
  
  has_secure_password
end
