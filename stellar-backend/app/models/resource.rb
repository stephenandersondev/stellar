class Resource < ApplicationRecord
  belongs_to :project
  belongs_to :user


  def self.get_apod
    api_key = ENV['NASA_KEY']
    url = "https://api.nasa.gov/planetary/apod?api_key=#{api_key}"
    response = HTTParty.get(url)
    response.parsed_response["url"]
  end

end
