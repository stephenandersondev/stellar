class ProjectsController < ApplicationController
    skip_before_action :authorized, only: [:create]

    def create
        project = Project.create(title: params[:title], description: params[:description])
        render json: {project: project}
    end
end
