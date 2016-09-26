class UserMailer < ActionMailer::Base
  def compose_mail(compose_params)
    # scrubber = Rails::Html::PermitScrubber.new
    # scrubber.tags = ['a', 'b', 'div', 'p', 'li', 'ul', 'ol', 'i', 'u']

    # html_fragment = Loofah.fragment(compose_params[:body])
    # html_fragment.scrub!(scrubber)
    # @body = html_fragment.to_s

    mail(from: compose_params[:from], to: compose_params[:to], subject: compose_params[:subject], content_type: 'text/html') do |format|
      format.html {
        render locals: { body: ActionView::Base.full_sanitizer.sanitize(compose_params[:body]) }
      }
    end
  end
end