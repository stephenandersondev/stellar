class ResourcesController < ApplicationController
    def index
        apod = Resource.get_apod
        render json: [apod]
    end
end
