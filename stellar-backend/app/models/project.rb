class Project < ApplicationRecord
    has_many :users
    has_many :messages
    has_many :resources
end
