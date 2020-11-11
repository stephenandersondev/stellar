class ResourcesController < ApplicationController
    skip_before_action :authorized, only: [:init]
    
    def index
    end

    def init
        apod = Resource.get_apod
        projects = Project.all
        render json: {apod:apod, projects:projects}
    end 

    def search
        search = Resource.get_search(params[:searchTerm])
        render json: {results:search}
    end 
end
