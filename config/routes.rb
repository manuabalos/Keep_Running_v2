Rails.application.routes.draw do
  
	root "home#index"
	
	devise_for :users, controllers: { sessions: "users/sessions", registrations: "users/registrations" }
	resources :news
	resources :routes do
		resources :waypoints
	end

	get '/filter', to: 'routes#filter', as: 'filter_routes'
  
end
