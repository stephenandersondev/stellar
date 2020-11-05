class Resource < ApplicationRecord
  belongs_to :project
  belongs_to :user


  def get_apod
    
  end

end
