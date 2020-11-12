class ResourcesController < ApplicationController
    skip_before_action :authorized, only: [:init, :update, :destroy, :create]
    
    def update
        resource = Resource.find(params[:id])
        resource.update(ord_num: params[:ord_num], content: params[:content])
        resource.save
    end

    def create
        resource = Resource.create(
            url:params[:url],
            content:params[:content],
            user_id:params[:user_id],
            project_id:params[:project_id],
            ord_num:params[:ord_num]
        )
    end

    def init
        apod = Resource.get_apod
        projects = Project.all
        render json: {apod:apod, projects:projects}
    end 

    def destroy 
        Resource.destroy(params[:id])
    end 

    def search
        search = Resource.get_search(params[:searchTerm])
        render json: {results:search}
    end 
end
