
// Helper so your handlers stay clean
function reachGoalSafe(goalId, params) {
  // Will only send when the tag is actually ready
  window.__ym?.reachGoal(goalId, params);
}

// Use event delegation: works even if elements are rendered later
document.addEventListener("click", (e) => {
  if (e.target.closest(".header-nav__home")) {
    reachGoalSafe("clickOnCaseHeaderBackHome");
    return;
  }

  if (e.target.closest("#case-study-nav .home")) {
    reachGoalSafe("clickOnCaseNavigationBackHome");
    return;
  }

  if (e.target.closest("#case-study-nav .nav-section")) {
    reachGoalSafe("clickOnCaseNavigation");
    return;
  }

  if (e.target.closest("#other-cases a")) {
    reachGoalSafe("clickOnCaseOtherCases");
    return;
  }
});