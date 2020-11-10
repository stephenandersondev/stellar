class ResourcesController < ApplicationController
    skip_before_action :authorized, only: [:apod]
    
    def index
    end

    def apod
        apod = Resource.get_apod
        render json: {apod: apod}
    end 

    def search
        search = Resource.get_search(params[:searchTerm])
        render json: {results:search}
    end 
end
