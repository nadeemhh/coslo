 export default function getCategoryNestingLevel(categories, categoryId) {
    // Helper function to recursively search through the category tree
    function searchCategory(categoryList, targetId, currentLevel = 0) {
        for (const category of categoryList) {
            // Check if current category matches the target ID
            if (category.id === targetId) {
                return currentLevel;
            }
            
            // If category has children, search recursively with increased level
            if (category.children && category.children.length > 0) {
                const result = searchCategory(category.children, targetId, currentLevel + 1);
                if (result !== -1) {
                    return result;
                }
            }
        }
        // Return -1 if category not found at this level
        return -1;
    }
    
    // Start search from the root level (level 0)
    const nestingLevel = searchCategory(categories, categoryId, 0);
    
    // Return the nesting level or -1 if category not found
    return nestingLevel;
}
