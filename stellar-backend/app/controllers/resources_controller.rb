class ResourcesController < ApplicationController
    skip_before_action :authorized, only: [:init, :update]
    
    def index
    end

    def update
        resource = Resource.find(params[:id])
        resource.update(ord_num: params[:ord_num])
        resource.save
    end

    def 

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
