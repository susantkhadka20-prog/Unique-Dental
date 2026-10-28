// Unique Dental Clinic Pvt. Ltd. website scripts

document.addEventListener("DOMContentLoaded", () => {
  // Update footer copyright year.
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Smooth-scroll for on-page navigation links.
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // A website cannot publish Google reviews directly. This form validates the
  // visitor's draft, then opens the clinic's Google review page for the visitor
  // to review and submit through Google themselves.
  const reviewForm = document.getElementById("review-form");
  const status = document.getElementById("review-status");
  const googleReviewUrl = "https://search.google.com/local/writereview?placeid=ChIJNcdgRIMZ6zkR1aS3jbvFrSM";

  if (reviewForm) {
    reviewForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.getElementById("review-name").value.trim();
      const rating = document.getElementById("review-rating").value;
      const message = document.getElementById("review-text").value.trim();

      if (!message) {
        if (status) status.textContent = "Please write your review first.";
        return;
      }

      // The review draft is copied to the clipboard where supported.
      const draft = `${"★".repeat(Number(rating))}${"☆".repeat(5 - Number(rating))}\n${name ? `By ${name}\n` : ""}${message}`;
      if (status) {
        status.textContent = "Opening Google Reviews. Paste your review there, check it, and submit it on Google.";
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(draft).catch(() => {});
      }
      window.open(googleReviewUrl, "_blank", "noopener,noreferrer");
    });
  }
});
