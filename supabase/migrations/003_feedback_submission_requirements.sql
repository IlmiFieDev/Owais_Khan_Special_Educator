-- Non-destructive validation for new feedback submissions.
-- Existing legacy rows are preserved because constraints are added NOT VALID.

alter table feedback
  add constraint feedback_new_name_required
    check (name is not null and char_length(trim(name)) between 2 and 60) not valid,
  add constraint feedback_new_relationship_required
    check (relationship in ('parent','teacher','therapist','institution','other')) not valid,
  add constraint feedback_new_rating_required
    check (rating is not null and rating between 1 and 5) not valid,
  add constraint feedback_new_message_required
    check (message is not null and char_length(trim(message)) between 20 and 500) not valid;

-- Public consumers receive only approved, consented feedback and an anonymised
-- author label. Historical records remain private unless both gates are true.
create or replace view public_feedback as
  select
    id,
    case
      when name is null or length(trim(name)) = 0 then 'Anonymous'
      else upper(left(trim(name), 1)) || '.'
    end as name,
    relationship,
    rating,
    message,
    city,
    created_at
  from feedback
  where status = 'approved'
    and consent_to_display = true
    and publication_consent = true;

grant select on public_feedback to anon;
