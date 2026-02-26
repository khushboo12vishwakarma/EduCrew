from django.urls import path,  include 
from rest_framework.routers import DefaultRouter
from . import views 
from .views import PresentationViewSet
from .views import (
    register_user,
    top_research_papers,
    upload_and_process,
    code_run,
    code_review,
    code_explain,
    code_generate,
     code_animate,
     interview_report,
     submit_interview_solution,
     start_interview,
     project_planner,
    project_tasks_today,      # NEW
    project_task_complete, 
    forgot_password,
    reset_password,
    get_profile,
    update_profile,
    change_password,
    profile_view ,
    change_password, 
    


)

router = DefaultRouter()
router.register(r'presentations', PresentationViewSet, basename='presentation')

urlpatterns = [
    # ✅ NEW: My Content APIs
    path('study-materials/my-materials/', views.my_study_materials, name='my_study_materials'),
 path('presentations/my-presentations/', views.my_presentations, name='my-presentations'),
    path('code-sessions/my-sessions/', views.my_code_sessions, name='my_code_sessions'),
    path('projects/my-projects/', views.my_projects, name='my_projects'),
    # path('presentations/<int:pk>/download/', views.download_presentation, name='download_presentation'),
    path('presentations/<int:pk>/', views.presentation_detail, name='presentation_detail'),
# path('presentations/<int:pk>/download/', views.download_presentation, name='download_presentation'),
 path('presentations/<int:pk>/download/', views.download_presentation, name='download_presentation'),


  
    # Profile endpoints - ADD THESE
    path('profile/', profile_view, name='profile'),
    path('profile/', get_profile, name='get-profile'),
    path('profile/update/', update_profile, name='update-profile'),
     path('change-password/', change_password, name='change-password'),

    # Detail views - ADD THESE
    path('study-materials/<int:pk>/',views.study_material_detail, name='study_material_detail'),
    # path('presentations/<int:pk>/', views.presentation_detail, name='presentation_detail'),
    path('code-sessions/<int:pk>/', views.code_session_detail, name='code_session_detail'),
    path('projects/<int:pk>/', views.project_detail, name='project_detail'),

    path('project-tasks/',views.create_task, name='create_task'),
    path('project-tasks/<int:pk>/',views.update_task, name='update_task'),


    path('register/', register_user, name='register'),
    path('forgot-password/', forgot_password, name='forgot-password'),
    path('reset-password/', reset_password, name='reset-password'),

    # Research Librarian
    path('top-papers/', top_research_papers, name='top_research_papers'), 
        
    # Study Coach Agent
    path('upload-notes/', upload_and_process, name='upload-notes'),
    path('', include(router.urls)),
   

   #code mentor agent
    path('code/run/', code_run, name='code_run'),
    path('code/review/', code_review, name='code_review'),
    path('code/explain/', code_explain, name='code_explain'),
    path('code/generate/', code_generate, name='code_generate'),
    path('code/animate/', code_animate, name='code-animate'),
    path('interview/start/',start_interview, name='start-interview'),
    path('interview/<int:session_id>/submit/',submit_interview_solution, name='submit-interview'),
    path('interview/<int:session_id>/report/',interview_report, name='interview-report'),


    

    # Project Planner - consistent prefix
path("planner/create/", project_planner, name="project-planner"),
path("planner/tasks/today/", project_tasks_today, name="project-tasks-today"),
path("planner/tasks/<int:task_id>/complete/", project_task_complete, name="project-task-complete"),

# NEW endpoints
path('planner/projects/', views.get_user_projects, name='user-projects'),
path('planner/projects/<int:project_id>/', views.get_project_detail, name='project-detail'),
path('planner/projects/<int:project_id>/tasks/', views.get_project_tasks, name='project-tasks'),
path('planner/projects/<int:project_id>/delete/', views.delete_project, name='delete-project'),
path('planner/update-email/', views.update_notification_email, name='update-email'),
path('planner/tasks/<int:task_id>/send-reminder/', views.send_test_reminder, name='send-test-reminder'),


 path('dashboard/overview/',views.dashboard_overview, name='dashboard-overview'),


   
]





