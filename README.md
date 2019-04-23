# dissowebapp

### Table of Contents

-   [editFoodItem][1]
    -   [Parameters][2]
-   [writeEdit][3]
-   [changeTitle][4]
    -   [Parameters][5]
-   [populateList][6]
    -   [Parameters][7]

## editFoodItem

This function is called when a user selects a food item from their inventory that they wish to edit details of. This is intiated when a user clicks on the food item's icon.
 The purpose of this function is to bring up a 'edit' html page, loaded with the info stored about the food item being edited

### Parameters

-   `foodKey`
-   `foodType`
-   `userId`

## writeEdit

This function writes any changes made when a user commits their food item edits.
  It uses values in the input fields generated from editFoodItem().

## changeTitle

this function changes the navbar header to represent the food inventory currently being shown in #main's foodlist.
It is called whenever a user navigates to one of their three inventories (fridge/freezer/pantry).

### Parameters

-   `foodType` **[String][8]** expects one of {"fridge","freezer","pantry"}

## populateList

This function displays food items stored in the current user's relevant area from their food inventory in main html section

### Parameters

-   `foodType` **[String][8]** expects one of {"fridge","freezer","pantry"} used during database read request

[1]: #editfooditem

[2]: #parameters

[3]: #writeedit

[4]: #changetitle

[5]: #parameters-1

[6]: #populatelist

[7]: #parameters-2
