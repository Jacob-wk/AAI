## Cart Icon Update Testing

### Steps to Test:

1. **Open Browser Developer Console**
   - Press F12 to open developer tools
   - Go to the Console tab

2. **Monitor Cart Events**
   - Look for these console messages when adding items to cart:
     - "CartIcon connected, current count: X"
     - "CartAddEvent dispatched with data: {...}"
     - "Global cart update handler triggered: {...}"
     - "Cart update event: {...}"

3. **Test Add to Cart**
   - Add an item to cart from a product page
   - Check if cart count updates immediately in header
   - Verify console shows the expected log messages

4. **Manual Refresh (if needed)**
   - If cart count doesn't update, try running in console:
     ```javascript
     refreshCartCount()
     ```

### Debugging Checklist:

- [ ] CartIcon component loads and connects
- [ ] Product form dispatches CartAddEvent
- [ ] Global cart update handler receives event
- [ ] Cart API call succeeds (/cart.js)
- [ ] Cart count updates in header
- [ ] Accessibility text updates correctly

### Common Issues:

1. **Module Import Errors**: Check if cart-icon.js loads without errors
2. **Event Not Dispatching**: Check if product form submission works
3. **API Call Failing**: Check network tab for /cart.js requests
4. **DOM Structure**: Verify cart bubble has expected elements

### Manual Test Commands:

```javascript
// Check if cart icon is properly loaded
document.querySelector('cart-icon')

// Manually trigger cart update
document.dispatchEvent(new CustomEvent('cart:update', { 
  detail: { data: { source: 'test', itemCount: 1 } } 
}))

// Check current cart count
document.querySelector('cart-icon').currentCartCount

// Refresh cart count manually
refreshCartCount()
```
