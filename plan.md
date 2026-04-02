1. **Change page layout**: Make `page.tsx` contain a `fixed inset-0` container for all sections, so they perfectly overlap and never scroll visually.
2. **Add a scroll track**: Add a dummy `<div className="h-[700vh] w-full" />` to the page to allow the user to actually scroll their mouse.
3. **Map scroll to opacity**: In `PinnedCanvas`, instead of using viewport intersection triggers (`onEnter/onLeave`), map the page's total scroll progress directly to the opacity of the fading sections, one by one.
4. **Fix section backgrounds**: Ensure `rgba(10,10,10, 0.72)` still works when perfectly stacked, or make the overlapping sections transparent so the background stripe is consistent.
