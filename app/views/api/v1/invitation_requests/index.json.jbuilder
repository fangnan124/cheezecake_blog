json.data do
  json.invitation_requests do
    json.array! @invitation_requests, partial: 'invitation_request', as: :invitation_request
  end
  json.currentPage @invitation_requests.current_page
  json.totalPages @invitation_requests.total_pages
end
