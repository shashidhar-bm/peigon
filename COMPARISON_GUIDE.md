# How to Use API Response Comparison

## Overview

The API Response Comparison feature allows you to save API responses and compare them side-by-side to see what changed between different versions, environments, or time periods.

## Features

✅ **Save Responses** - Save any API response with a custom name  
✅ **Compare Responses** - Compare two saved responses or compare with current response  
✅ **Visual Diff** - See added, removed, and modified fields highlighted  
✅ **Multiple View Modes** - Side-by-side or unified diff view  
✅ **Deep Comparison** - Compares nested objects and arrays  
✅ **Change Statistics** - See count of added/removed/modified fields  

---

## Step-by-Step Guide

### 1. **Make an API Request**

First, make a request to get a response:

```
Method: GET
URL: https://jsonplaceholder.typicode.com/users/1
Click: Send
```

You'll get a response with user data.

### 2. **Save the Response**

After getting a response:

1. Look for a **"Save Response"** or **"Compare"** button
2. Click it to save the current response
3. Enter a name: e.g., "User 1 - Production"
4. Click Save

The response is now saved in localStorage for comparison.

### 3. **Make Another Request**

Make a different request or modify the URL:

```
Method: GET
URL: https://jsonplaceholder.typicode.com/users/2
Click: Send
```

Save this one too with a different name: "User 2 - Production"

### 4. **Enter Comparison Mode**

1. Click the **"Toggle Comparison Mode"** button
2. The UI will switch to comparison mode

### 5. **Select Responses to Compare**

You'll see two dropdowns:

**Left Side:**
- Select "User 1 - Production" (or any saved response)
- Or select "Current Response" to compare with the latest request

**Right Side:**
- Select "User 2 - Production" (or another saved response)
- Or select "Current Response"

### 6. **Compare**

Click the **"Compare"** button

You'll see a detailed diff showing:
- 🟢 **Green** = Added fields (exist in right but not in left)
- 🔴 **Red** = Removed fields (exist in left but not in right)
- 🟡 **Yellow** = Modified fields (values changed)
- ⚪ **Gray** = Unchanged fields

### 7. **View Modes**

Switch between view modes:

**Side-by-Side:**
```
┌─────────────────┬─────────────────┐
│   Left (Old)    │   Right (New)   │
├─────────────────┼─────────────────┤
│ {               │ {               │
│   "id": 1,      │   "id": 2,      │
│   "name": "A"   │   "name": "B"   │
│ }               │ }               │
└─────────────────┴─────────────────┘
```

**Unified:**
```
{
  - "id": 1,        (removed)
  + "id": 2,        (added)
  - "name": "A"     (removed)
  + "name": "B"     (added)
}
```

---

## Use Cases

### 1. **Environment Comparison**

Compare responses from different environments:

```
Save: "User API - Development"
Save: "User API - Staging"
Save: "User API - Production"

Compare: Dev vs Prod to see differences
```

### 2. **Version Comparison**

Track API changes over time:

```
Save: "API v1 Response - Jan 1"
Save: "API v1 Response - Jan 15"

Compare: See what changed in 2 weeks
```

### 3. **Before/After Testing**

Test the impact of changes:

```
Save: "Before Update"
(Make changes to API/database)
Save: "After Update"

Compare: Verify expected changes
```

### 4. **Debugging**

Find unexpected changes:

```
Save: "Expected Response"
(Run test)
Compare: Current Response vs Expected
```

---

## Diff Details

### Change Types

**Added (🟢):**
- New fields that don't exist in the left response
- Array elements added
- New nested objects

**Removed (🔴):**
- Fields that existed in left but not in right
- Array elements removed
- Deleted nested objects

**Modified (🟡):**
- Values changed (e.g., `"name": "John"` → `"name": "Jane"`)
- Type changed (e.g., `123` → `"123"`)
- Array length changed

**Unchanged (⚪):**
- Identical values
- Same structure
- No changes

### Path Display

Nested changes show the full path:

```
user › address › city: "New York" → "Boston"
items[0] › price: 10.99 → 12.99
metadata › tags[2]: "urgent" → "normal"
```

---

## Managing Saved Responses

### View Saved Responses

All saved responses are listed in the comparison panel with:
- Response name
- Request URL
- Request method (GET, POST, etc.)
- Saved date/time

### Delete Saved Responses

Click the delete (×) button next to any saved response to remove it.

### Storage

Responses are saved in browser localStorage:
- Persists across page reloads
- Stored per browser/device
- No server storage needed

---

## Tips & Tricks

### 1. **Naming Convention**

Use descriptive names:
- ✅ "User API - Prod - 2024-01-15"
- ✅ "Login Response - Success Case"
- ❌ "Response 1"

### 2. **Compare with Current**

You don't need to save both responses:
- Save one response
- Make another request
- Compare saved vs "Current Response"

### 3. **Quick Testing**

For rapid testing:
1. Save baseline response
2. Make changes
3. Compare each new response with baseline
4. No need to save every test

### 4. **Large Responses**

For large JSON responses:
- The diff algorithm handles nested structures
- Use the unified view for easier scanning
- Look at the change count summary first

---

## Example Workflow

```bash
# 1. Get production data
GET https://api.example.com/users/1
→ Save as "User 1 - Production"

# 2. Get staging data
GET https://staging-api.example.com/users/1
→ Save as "User 1 - Staging"

# 3. Compare
Toggle Comparison Mode
Left: "User 1 - Production"
Right: "User 1 - Staging"
Click: Compare

# 4. Review differences
✓ See what's different between environments
✓ Verify staging has expected changes
✓ Check for unexpected differences
```

---

## Keyboard Shortcuts (if implemented)

- `Ctrl/Cmd + S` - Save current response
- `Ctrl/Cmd + K` - Toggle comparison mode
- `Esc` - Exit comparison mode

---

## Troubleshooting

**"No response to save"**
- Make sure you've sent a request and received a response first

**"Please select two responses to compare"**
- Select both left and right responses before clicking Compare

**Comparison not showing changes**
- Verify you selected different responses
- Check that the responses actually have differences

**Saved responses disappeared**
- Responses are stored in localStorage
- Clearing browser data will delete them
- They're not synced across devices

---

## Technical Details

### Diff Algorithm

The comparison uses a recursive diff algorithm that:
- Compares objects key-by-key
- Compares arrays element-by-element
- Handles nested structures
- Detects type changes
- Preserves path information

### Storage Format

Saved responses include:
```typescript
{
  id: string;
  name: string;
  response: ApiResponse;
  savedAt: string;
  requestUrl: string;
  requestMethod: HttpMethod;
}
```

---

This feature makes it easy to track API changes, debug issues, and verify that your APIs behave consistently across environments! 🎯
