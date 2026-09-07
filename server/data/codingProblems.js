export const codingProblems = [
  // 1. Arrays & Hashing
  {
    id: "prob-01",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array & Hash Table",
    acceptanceRate: "89%",
    functionName: "twoSum",
    description: `Given an array of integers \`nums\` and an integer \`target\`, return *indices of the two numbers such that they add up to \`target\`*.\n\nYou may assume that each input would have ***exactly one solution***, and you may not use the same element twice.`,
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" }
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const comp = target - nums[i];
    if (map.has(comp)) return [map.get(comp), i];
    map.set(nums[i], i);
  }
  return [];
}`,
      python: `def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen: return [seen[diff], i]
        seen[num] = i
    return []`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int comp = target - nums[i];
            if (map.containsKey(comp)) return new int[] { map.get(comp), i };
            map.put(nums[i], i);
        }
        return new int[0];
    }
}`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); ++i) {
            int diff = target - nums[i];
            if (seen.count(diff)) return {seen[diff], i};
            seen[nums[i]] = i;
        }
        return {};
    }
};`
    },
    testCases: [
      { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] },
      { input: { nums: [3, 2, 4], target: 6 }, expected: [1, 2] },
      { input: { nums: [3, 3], target: 6 }, expected: [0, 1] }
    ],
    hints: ["Use a hash map to look up if target - nums[i] was already visited in O(1) time."],
    optimalComplexity: { time: "O(n)", space: "O(n)", notes: "Linear single-pass hash map." }
  },
  {
    id: "prob-02",
    title: "Contains Duplicate",
    difficulty: "Easy",
    category: "Array & Hash Table",
    acceptanceRate: "91%",
    functionName: "containsDuplicate",
    description: `Given an integer array \`nums\`, return \`true\` if any value appears **at least twice** in the array, and return \`false\` if every element is distinct.`,
    examples: [
      { input: "nums = [1,2,3,1]", output: "true" },
      { input: "nums = [1,2,3,4]", output: "false" }
    ],
    starterCode: {
      javascript: `function containsDuplicate(nums) {
  const set = new Set();
  for (const n of nums) {
    if (set.has(n)) return true;
    set.add(n);
  }
  return false;
}`,
      python: `def contains_duplicate(nums):
    return len(nums) != len(set(nums))`,
      java: `class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for (int n : nums) if (!set.add(n)) return true;
        return false;
    }
}`,
      cpp: `class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        unordered_set<int> seen;
        for (int n : nums) if (!seen.insert(n).second) return true;
        return false;
    }
};`
    },
    testCases: [
      { input: { nums: [1, 2, 3, 1] }, expected: true },
      { input: { nums: [1, 2, 3, 4] }, expected: false },
      { input: { nums: [1, 1, 1, 3, 3, 4, 3, 2, 4, 2] }, expected: true }
    ],
    hints: ["Use a HashSet to store visited elements in O(1) time."],
    optimalComplexity: { time: "O(n)", space: "O(n)", notes: "Single pass HashSet." }
  },
  {
    id: "prob-03",
    title: "Valid Anagram",
    difficulty: "Easy",
    category: "Hash Table & String",
    acceptanceRate: "88%",
    functionName: "isAnagram",
    description: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\`, and \`false\` otherwise.`,
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: "true" },
      { input: 's = "rat", t = "car"', output: "false" }
    ],
    starterCode: {
      javascript: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = {};
  for (const c of s) count[c] = (count[c] || 0) + 1;
  for (const c of t) {
    if (!count[c]) return false;
    count[c]--;
  }
  return true;
}`,
      python: `def is_anagram(s: str, t: str) -> bool:
    if len(s) != len(t): return False
    count = {}
    for c in s: count[c] = count.get(c, 0) + 1
    for c in t:
        if c not in count or count[c] == 0: return False
        count[c] -= 1
    return True`,
      java: `class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] count = new int[26];
        for (char c : s.toCharArray()) count[c - 'a']++;
        for (char c : t.toCharArray()) if (--count[c - 'a'] < 0) return false;
        return true;
    }
}`,
      cpp: `class Solution {
public:
    bool isAnagram(string s, string t) {
        if (s.length() != t.length()) return false;
        vector<int> count(26, 0);
        for (char c : s) count[c - 'a']++;
        for (char c : t) if (--count[c - 'a'] < 0) return false;
        return true;
    }
};`
    },
    testCases: [
      { input: { s: "anagram", t: "nagaram" }, expected: true },
      { input: { s: "rat", t: "car" }, expected: false }
    ],
    hints: ["Use a frequency array or hash map of character counts."],
    optimalComplexity: { time: "O(n)", space: "O(1)", notes: "Fixed 26-char frequency array." }
  },
  {
    id: "prob-04",
    title: "Group Anagrams",
    difficulty: "Medium",
    category: "Array & Hash Table",
    acceptanceRate: "76%",
    functionName: "groupAnagrams",
    description: `Given an array of strings \`strs\`, group **the anagrams** together. You can return the answer in any order.`,
    examples: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
      { input: 'strs = [""]', output: '[[""]]' }
    ],
    starterCode: {
      javascript: `function groupAnagrams(strs) {
  const map = new Map();
  for (const s of strs) {
    const key = s.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(s);
  }
  return Array.from(map.values());
}`,
      python: `def group_anagrams(strs):
    from collections import defaultdict
    res = defaultdict(list)
    for s in strs:
        res["".join(sorted(s))].append(s)
    return list(res.values())`,
      java: `class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();
        for (String s : strs) {
            char[] chars = s.toCharArray();
            Arrays.sort(chars);
            String key = String.valueOf(chars);
            map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
        }
        return new ArrayList<>(map.values());
    }
}`,
      cpp: `class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> map;
        for (const string& s : strs) {
            string key = s;
            sort(key.begin(), key.end());
            map[key].push_back(s);
        }
        vector<vector<string>> res;
        for (auto& pair : map) res.push_back(pair.second);
        return res;
    }
};`
    },
    testCases: [
      { input: { strs: ["eat", "tea", "tan", "ate", "nat", "bat"] }, expected: [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]] },
      { input: { strs: ["a"] }, expected: [["a"]] }
    ],
    hints: ["Use sorted characters of each word as hash map keys."],
    optimalComplexity: { time: "O(n * k log k)", space: "O(n * k)", notes: "Hash map with sorted string keys." }
  },
  {
    id: "prob-05",
    title: "Top K Frequent Elements",
    difficulty: "Medium",
    category: "Heap & Hash Table",
    acceptanceRate: "73%",
    functionName: "topKFrequent",
    description: `Given an integer array \`nums\` and an integer \`k\`, return *the* \`k\` *most frequent elements*. You may return the answer in **any order**.`,
    examples: [
      { input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]" },
      { input: "nums = [1], k = 1", output: "[1]" }
    ],
    starterCode: {
      javascript: `function topKFrequent(nums, k) {
  const count = new Map();
  for (const n of nums) count.set(n, (count.get(n) || 0) + 1);

  const bucket = [];
  for (let i = 0; i <= nums.length; i++) bucket.push([]);

  for (const [num, freq] of count.entries()) {
    bucket[freq].push(num);
  }

  const res = [];
  for (let i = bucket.length - 1; i >= 0 && res.length < k; i--) {
    if (bucket[i].length > 0) {
      res.push(...bucket[i]);
    }
  }
  return res.slice(0, k);
}`,
      python: `def top_k_frequent(nums, k):
    from collections import Counter
    count = Counter(nums)
    return [item[0] for item in count.most_common(k)]`,
      java: `class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int n : nums) count.put(n, count.getOrDefault(n, 0) + 1);
        PriorityQueue<Integer> pq = new PriorityQueue<>((a, b) -> count.get(a) - count.get(b));
        for (int n : count.keySet()) {
            pq.add(n);
            if (pq.size() > k) pq.poll();
        }
        int[] res = new int[k];
        for (int i = 0; i < k; i++) res[i] = pq.poll();
        return res;
    }
}`,
      cpp: `class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map<int, int> count;
        for (int n : nums) count[n]++;
        auto comp = [&](int a, int b) { return count[a] > count[b]; };
        priority_queue<int, vector<int>, decltype(comp)> pq(comp);
        for (auto& p : count) {
            pq.push(p.first);
            if (pq.size() > k) pq.pop();
        }
        vector<int> res;
        while (!pq.empty()) { res.push_back(pq.top()); pq.pop(); }
        return res;
    }
};`
    },
    testCases: [
      { input: { nums: [1, 1, 1, 2, 2, 3], k: 2 }, expected: [1, 2] },
      { input: { nums: [1], k: 1 }, expected: [1] }
    ],
    hints: ["Bucket sort by frequency achieves linear O(n) runtime."],
    optimalComplexity: { time: "O(n)", space: "O(n)", notes: "Bucket sort algorithm." }
  },
  {
    id: "prob-06",
    title: "Product of Array Except Self",
    difficulty: "Medium",
    category: "Array & Prefix Product",
    acceptanceRate: "70%",
    functionName: "productExceptSelf",
    description: `Given an integer array \`nums\`, return *an array* \`answer\` *such that* \`answer[i]\` *is equal to the product of all the elements of* \`nums\` *except* \`nums[i]\`.\n\nYou must write an algorithm that runs in \`O(n)\` time and without using the division operation.`,
    examples: [
      { input: "nums = [1,2,3,4]", output: "[24,12,8,6]" },
      { input: "nums = [-1,1,0,-3,3]", output: "[0,0,9,0,0]" }
    ],
    starterCode: {
      javascript: `function productExceptSelf(nums) {
  const n = nums.length;
  const res = new Array(n).fill(1);
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    res[i] = prefix;
    prefix *= nums[i];
  }
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    res[i] *= suffix;
    suffix *= nums[i];
  }
  return res;
}`,
      python: `def product_except_self(nums):
    n = len(nums)
    res = [1] * n
    prefix = 1
    for i in range(n):
        res[i] = prefix
        prefix *= nums[i]
    suffix = 1
    for i in range(n - 1, -1, -1):
        res[i] *= suffix
        suffix *= nums[i]
    return res`,
      java: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];
        int prefix = 1;
        for (int i = 0; i < n; i++) { res[i] = prefix; prefix *= nums[i]; }
        int suffix = 1;
        for (int i = n - 1; i >= 0; i--) { res[i] *= suffix; suffix *= nums[i]; }
        return res;
    }
}`,
      cpp: `class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n, 1);
        int prefix = 1;
        for (int i = 0; i < n; ++i) { res[i] = prefix; prefix *= nums[i]; }
        int suffix = 1;
        for (int i = n - 1; i >= 0; --i) { res[i] *= suffix; suffix *= nums[i]; }
        return res;
    }
};`
    },
    testCases: [
      { input: { nums: [1, 2, 3, 4] }, expected: [24, 12, 8, 6] },
      { input: { nums: [-1, 1, 0, -3, 3] }, expected: [0, 0, 9, 0, 0] }
    ],
    hints: ["Compute prefix products in a first pass, then multiply with suffix accumulator in reverse."],
    optimalComplexity: { time: "O(n)", space: "O(1)", notes: "O(1) extra space excluding output array." }
  },
  {
    id: "prob-07",
    title: "Longest Consecutive Sequence",
    difficulty: "Medium",
    category: "Array & Hash Table",
    acceptanceRate: "67%",
    functionName: "longestConsecutive",
    description: `Given an unsorted array of integers \`nums\`, return *the length of the longest consecutive elements sequence*.\n\nYou must write an algorithm that runs in \`O(n)\` time.`,
    examples: [
      { input: "nums = [100,4,200,1,3,2]", output: "4", explanation: "Longest sequence is [1, 2, 3, 4]." },
      { input: "nums = [0,3,7,2,5,8,4,6,0,1]", output: "9" }
    ],
    starterCode: {
      javascript: `function longestConsecutive(nums) {
  const set = new Set(nums);
  let maxStreak = 0;

  for (const num of set) {
    if (!set.has(num - 1)) {
      let currentNum = num;
      let currentStreak = 1;
      while (set.has(currentNum + 1)) {
        currentNum += 1;
        currentStreak += 1;
      }
      maxStreak = Math.max(maxStreak, currentStreak);
    }
  }
  return maxStreak;
}`,
      python: `def longest_consecutive(nums):
    num_set = set(nums)
    max_len = 0
    for num in num_set:
        if num - 1 not in num_set:
            curr = num
            curr_len = 1
            while curr + 1 in num_set:
                curr += 1
                curr_len += 1
            max_len = max(max_len, curr_len)
    return max_len`,
      java: `class Solution {
    public int longestConsecutive(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for (int n : nums) set.add(n);
        int maxStreak = 0;
        for (int n : set) {
            if (!set.contains(n - 1)) {
                int curr = n;
                int streak = 1;
                while (set.contains(curr + 1)) { curr++; streak++; }
                maxStreak = Math.max(maxStreak, streak);
            }
        }
        return maxStreak;
    }
}`,
      cpp: `class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_set<int> set(nums.begin(), nums.end());
        int maxStreak = 0;
        for (int n : set) {
            if (!set.count(n - 1)) {
                int curr = n, streak = 1;
                while (set.count(curr + 1)) { curr++; streak++; }
                maxStreak = max(maxStreak, streak);
            }
        }
        return maxStreak;
    }
};`
    },
    testCases: [
      { input: { nums: [100, 4, 200, 1, 3, 2] }, expected: 4 },
      { input: { nums: [0, 3, 7, 2, 5, 8, 4, 6, 0, 1] }, expected: 9 },
      { input: { nums: [] }, expected: 0 }
    ],
    hints: ["Only start counting a sequence if num - 1 is NOT present in the set."],
    optimalComplexity: { time: "O(n)", space: "O(n)", notes: "HashSet allows linear streak counting." }
  },

  // 2. Two Pointers
  {
    id: "prob-08",
    title: "Valid Palindrome",
    difficulty: "Easy",
    category: "Two Pointers & String",
    acceptanceRate: "86%",
    functionName: "isPalindrome",
    description: `A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.\n\nGiven a string \`s\`, return \`true\` *if it is a palindrome, or* \`false\` *otherwise*.`,
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: "true" },
      { input: 's = "race a car"', output: "false" }
    ],
    starterCode: {
      javascript: `function isPalindrome(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0, right = clean.length - 1;
  while (left < right) {
    if (clean[left] !== clean[right]) return false;
    left++;
    right--;
  }
  return true;
}`,
      python: `def is_palindrome(s: str) -> bool:
    clean = [c.lower() for c in s if c.isalnum()]
    return clean == clean[::-1]`,
      java: `class Solution {
    public boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;
            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) return false;
            left++; right--;
        }
        return true;
    }
}`,
      cpp: `class Solution {
public:
    bool isPalindrome(string s) {
        int left = 0, right = s.size() - 1;
        while (left < right) {
            while (left < right && !isalnum(s[left])) left++;
            while (left < right && !isalnum(s[right])) right--;
            if (tolower(s[left]) != tolower(s[right])) return false;
            left++; right--;
        }
        return true;
    }
};`
    },
    testCases: [
      { input: { s: "A man, a plan, a canal: Panama" }, expected: true },
      { input: { s: "race a car" }, expected: false },
      { input: { s: " " }, expected: true }
    ],
    hints: ["Use two pointers moving inward while filtering out non-alphanumeric characters."],
    optimalComplexity: { time: "O(n)", space: "O(1)", notes: "In-place two pointer scan." }
  },
  {
    id: "prob-09",
    title: "3Sum",
    difficulty: "Medium",
    category: "Two Pointers & Array",
    acceptanceRate: "69%",
    functionName: "threeSum",
    description: `Given an integer array \`nums\`, return all the triplets \`[nums[i], nums[j], nums[k]]\` such that \`i != j\`, \`i != k\`, and \`j != k\`, and \`nums[i] + nums[j] + nums[k] == 0\`.\n\nNotice that the solution set must not contain duplicate triplets.`,
    examples: [
      { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" },
      { input: "nums = [0,1,1]", output: "[]" }
    ],
    starterCode: {
      javascript: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const res = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1, right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        res.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++; right--;
      } else if (sum < 0) left++;
      else right--;
    }
  }
  return res;
}`,
      python: `def three_sum(nums):
    nums.sort()
    res = []
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i - 1]: continue
        left, right = i + 1, len(nums) - 1
        while left < right:
            s = nums[i] + nums[left] + nums[right]
            if s == 0:
                res.append([nums[i], nums[left], nums[right]])
                while left < right and nums[left] == nums[left + 1]: left += 1
                while left < right and nums[right] == nums[right - 1]: right -= 1
                left += 1; right -= 1
            elif s < 0: left += 1
            else: right -= 1
    return res`,
      java: `class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        for (int i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int left = i + 1, right = nums.length - 1;
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (sum == 0) {
                    res.add(Arrays.asList(nums[i], nums[left], nums[right]));
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    while (left < right && nums[right] == nums[right - 1]) right--;
                    left++; right--;
                } else if (sum < 0) left++;
                else right--;
            }
        }
        return res;
    }
}`,
      cpp: `class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> res;
        for (int i = 0; i < (int)nums.size() - 2; ++i) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int left = i + 1, right = nums.size() - 1;
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (sum == 0) {
                    res.push_back({nums[i], nums[left], nums[right]});
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    while (left < right && nums[right] == nums[right - 1]) right--;
                    left++; right--;
                } else if (sum < 0) left++;
                else right--;
            }
        }
        return res;
    }
};`
    },
    testCases: [
      { input: { nums: [-1, 0, 1, 2, -1, -4] }, expected: [[-1, -1, 2], [-1, 0, 1]] },
      { input: { nums: [0, 1, 1] }, expected: [] },
      { input: { nums: [0, 0, 0] }, expected: [[0, 0, 0]] }
    ],
    hints: ["Sort the array first, then fix index i and use two pointers for the remaining sum."],
    optimalComplexity: { time: "O(n^2)", space: "O(1)", notes: "Sort and two-pointer scan." }
  },
  {
    id: "prob-10",
    title: "Container With Most Water",
    difficulty: "Medium",
    category: "Two Pointers & Greedy",
    acceptanceRate: "79%",
    functionName: "maxArea",
    description: `Given an integer array \`height\` of length \`n\`, find two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn *the maximum amount of water a container can store*.`,
    examples: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" },
      { input: "height = [1,1]", output: "1" }
    ],
    starterCode: {
      javascript: `function maxArea(height) {
  let left = 0, right = height.length - 1;
  let maxWater = 0;
  while (left < right) {
    const h = Math.min(height[left], height[right]);
    maxWater = Math.max(maxWater, h * (right - left));
    if (height[left] < height[right]) left++;
    else right--;
  }
  return maxWater;
}`,
      python: `def max_area(height):
    left, right = 0, len(height) - 1
    max_w = 0
    while left < right:
        h = min(height[left], height[right])
        max_w = max(max_w, h * (right - left))
        if height[left] < height[right]: left += 1
        else: right -= 1
    return max_w`,
      java: `class Solution {
    public int maxArea(int[] height) {
        int left = 0, right = height.length - 1, maxWater = 0;
        while (left < right) {
            int h = Math.min(height[left], height[right]);
            maxWater = Math.max(maxWater, h * (right - left));
            if (height[left] < height[right]) left++;
            else right--;
        }
        return maxWater;
    }
}`,
      cpp: `class Solution {
public:
    int maxArea(vector<int>& height) {
        int left = 0, right = height.size() - 1, maxWater = 0;
        while (left < right) {
            int h = min(height[left], height[right]);
            maxWater = max(maxWater, h * (right - left));
            if (height[left] < height[right]) left++;
            else right--;
        }
        return maxWater;
    }
};`
    },
    testCases: [
      { input: { height: [1, 8, 6, 2, 5, 4, 8, 3, 7] }, expected: 49 },
      { input: { height: [1, 1] }, expected: 1 }
    ],
    hints: ["Start with maximum width (left=0, right=n-1) and greedily move the shorter line inward."],
    optimalComplexity: { time: "O(n)", space: "O(1)", notes: "Two-pointer linear contraction." }
  },

  // 3. Sliding Window
  {
    id: "prob-11",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    category: "Sliding Window & Array",
    acceptanceRate: "81%",
    functionName: "maxProfit",
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i-th\` day. Return the maximum profit achievable from one buy and one sell transaction in the future.`,
    examples: [
      { input: "prices = [7,1,5,3,6,4]", output: "5" },
      { input: "prices = [7,6,4,3,1]", output: "0" }
    ],
    starterCode: {
      javascript: `function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  for (const price of prices) {
    if (price < minPrice) minPrice = price;
    else maxProfit = Math.max(maxProfit, price - minPrice);
  }
  return maxProfit;
}`,
      python: `def max_profit(prices):
    min_p, max_p = float('inf'), 0
    for p in prices:
        if p < min_p: min_p = p
        else: max_p = max(max_p, p - min_p)
    return max_p`,
      java: `class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE, maxProfit = 0;
        for (int p : prices) {
            if (p < minPrice) minPrice = p;
            else maxProfit = Math.max(maxProfit, p - minPrice);
        }
        return maxProfit;
    }
}`,
      cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int minPrice = INT_MAX, maxProfit = 0;
        for (int p : prices) {
            if (p < minPrice) minPrice = p;
            else maxProfit = max(maxProfit, p - minPrice);
        }
        return maxProfit;
    }
};`
    },
    testCases: [
      { input: { prices: [7, 1, 5, 3, 6, 4] }, expected: 5 },
      { input: { prices: [7, 6, 4, 3, 1] }, expected: 0 }
    ],
    hints: ["Maintain the minimum price seen so far as you iterate."],
    optimalComplexity: { time: "O(n)", space: "O(1)", notes: "Linear single pass." }
  },
  {
    id: "prob-12",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "Sliding Window",
    acceptanceRate: "72%",
    functionName: "lengthOfLongestSubstring",
    description: `Given a string \`s\`, find the length of the **longest substring** without repeating characters.`,
    examples: [
      { input: 's = "abcabcbb"', output: "3" },
      { input: 's = "bbbbb"', output: "1" }
    ],
    starterCode: {
      javascript: `function lengthOfLongestSubstring(s) {
  let left = 0, maxLen = 0;
  const lastSeen = new Map();
  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    if (lastSeen.has(char) && lastSeen.get(char) >= left) {
      left = lastSeen.get(char) + 1;
    }
    lastSeen.set(char, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
      python: `def length_of_longest_substring(s: str) -> int:
    seen = {}
    left, max_len = 0, 0
    for right, char in enumerate(s):
        if char in seen and seen[char] >= left:
            left = seen[char] + 1
        seen[char] = right
        max_len = max(max_len, right - left + 1)
    return max_len`,
      java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> seen = new HashMap<>();
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (seen.containsKey(c) && seen.get(c) >= left) left = seen.get(c) + 1;
            seen.put(c, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`,
      cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        unordered_map<char, int> seen;
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.size(); right++) {
            if (seen.count(s[right]) && seen[s[right]] >= left) left = seen[s[right]] + 1;
            seen[s[right]] = right;
            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};`
    },
    testCases: [
      { input: { s: "abcabcbb" }, expected: 3 },
      { input: { s: "bbbbb" }, expected: 1 },
      { input: { s: "pwwkew" }, expected: 3 }
    ],
    hints: ["Sliding window with hash map storing last index of each character."],
    optimalComplexity: { time: "O(n)", space: "O(min(n, m))", notes: "Sliding window." }
  },
  {
    id: "prob-13",
    title: "Longest Repeating Character Replacement",
    difficulty: "Medium",
    category: "Sliding Window",
    acceptanceRate: "65%",
    functionName: "characterReplacement",
    description: `You are given a string \`s\` and an integer \`k\`. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most \`k\` times.\n\nReturn *the length of the longest substring containing the same letter you can get after performing the above operations*.`,
    examples: [
      { input: 's = "ABAB", k = 2', output: "4" },
      { input: 's = "AABABBA", k = 1', output: "4" }
    ],
    starterCode: {
      javascript: `function characterReplacement(s, k) {
  const count = new Array(26).fill(0);
  let left = 0, maxFreq = 0, maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    const idx = s.charCodeAt(right) - 65;
    count[idx]++;
    maxFreq = Math.max(maxFreq, count[idx]);
    while ((right - left + 1) - maxFreq > k) {
      count[s.charCodeAt(left) - 65]--;
      left++;
    }
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
      python: `def character_replacement(s: str, k: int) -> int:
    count = {}
    left = max_freq = max_len = 0
    for right, c in enumerate(s):
        count[c] = count.get(c, 0) + 1
        max_freq = max(max_freq, count[c])
        while (right - left + 1) - max_freq > k:
            count[s[left]] -= 1
            left += 1
        max_len = max(max_len, right - left + 1)
    return max_len`,
      java: `class Solution {
    public int characterReplacement(String s, int k) {
        int[] count = new int[26];
        int left = 0, maxFreq = 0, maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            maxFreq = Math.max(maxFreq, ++count[s.charAt(right) - 'A']);
            while ((right - left + 1) - maxFreq > k) {
                count[s.charAt(left) - 'A']--;
                left++;
            }
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`,
      cpp: `class Solution {
public:
    int characterReplacement(string s, int k) {
        vector<int> count(26, 0);
        int left = 0, maxFreq = 0, maxLen = 0;
        for (int right = 0; right < s.size(); ++right) {
            maxFreq = max(maxFreq, ++count[s[right] - 'A']);
            while ((right - left + 1) - maxFreq > k) {
                count[s[left++] - 'A']--;
            }
            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};`
    },
    testCases: [
      { input: { s: "ABAB", k: 2 }, expected: 4 },
      { input: { s: "AABABBA", k: 1 }, expected: 4 }
    ],
    hints: ["Window is valid if (window length - most frequent char count) <= k."],
    optimalComplexity: { time: "O(n)", space: "O(1)", notes: "Sliding window with character frequency." }
  },

  // 4. Stack
  {
    id: "prob-14",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    acceptanceRate: "85%",
    functionName: "isValid",
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.`,
    examples: [
      { input: 's = "()"', output: "true" },
      { input: 's = "()[]{}"', output: "true" },
      { input: 's = "(]"', output: "false" }
    ],
    starterCode: {
      javascript: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const char of s) {
    if (char === '(' || char === '{' || char === '[') stack.push(char);
    else if (stack.length === 0 || stack.pop() !== map[char]) return false;
  }
  return stack.length === 0;
}`,
      python: `def is_valid(s: str) -> bool:
    stack = []
    map = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in map.values(): stack.append(char)
        elif not stack or stack.pop() != map[char]: return False
    return not stack`,
      java: `class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}`,
      cpp: `class Solution {
public:
    boolean isValid(string s) {
        stack<char> st;
        for (char c : s) {
            if (c == '(' || c == '{' || c == '[') st.push(c);
            else {
                if (st.empty()) return false;
                char top = st.top(); st.pop();
                if ((c == ')' && top != '(') || (c == '}' && top != '{') || (c == ']' && top != '[')) return false;
            }
        }
        return st.empty();
    }
};`
    },
    testCases: [
      { input: { s: "()" }, expected: true },
      { input: { s: "()[]{}" }, expected: true },
      { input: { s: "(]" }, expected: false }
    ],
    hints: ["Use a LIFO Stack to match open and close brackets."],
    optimalComplexity: { time: "O(n)", space: "O(n)", notes: "Stack matching." }
  },
  {
    id: "prob-15",
    title: "Min Stack",
    difficulty: "Medium",
    category: "Stack",
    acceptanceRate: "78%",
    functionName: "testMinStack",
    description: `Design a stack that supports push, pop, top, and retrieving the minimum element in constant time \`O(1)\`.\n\nImplement \`push(val)\`, \`pop()\`, \`top()\`, and \`getMin()\`.`,
    examples: [
      { input: 'operations = ["push(-2)","push(0)","push(-3)","getMin()","pop()","top()","getMin()"]', output: "[-3, 0, -2]" }
    ],
    starterCode: {
      javascript: `function testMinStack(ops) {
  const stack = [];
  const minStack = [];
  const results = [];
  for (const op of ops) {
    if (op.startsWith("push")) {
      const val = parseInt(op.match(/-?\\d+/)[0]);
      stack.push(val);
      const curMin = minStack.length === 0 ? val : Math.min(val, minStack[minStack.length - 1]);
      minStack.push(curMin);
    } else if (op === "pop") {
      stack.pop();
      minStack.pop();
    } else if (op === "top") {
      results.push(stack[stack.length - 1]);
    } else if (op === "getMin") {
      results.push(minStack[minStack.length - 1]);
    }
  }
  return results;
}`,
      python: `class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []
    def push(self, val: int) -> None:
        self.stack.append(val)
        val = min(val, self.min_stack[-1] if self.min_stack else val)
        self.min_stack.append(val)
    def pop(self) -> None:
        self.stack.pop(); self.min_stack.pop()
    def top(self) -> int: return self.stack[-1]
    def getMin(self) -> int: return self.min_stack[-1]`,
      java: `class MinStack {
    private Stack<Integer> stack = new Stack<>();
    private Stack<Integer> minStack = new Stack<>();
    public void push(int val) {
        stack.push(val);
        val = minStack.isEmpty() ? val : Math.min(val, minStack.peek());
        minStack.push(val);
    }
    public void pop() { stack.pop(); minStack.pop(); }
    public int top() { return stack.peek(); }
    public int getMin() { return minStack.peek(); }
}`,
      cpp: `class MinStack {
    stack<int> s, minS;
public:
    void push(int val) {
        s.push(val);
        if (minS.empty() || val <= minS.top()) minS.push(val);
    }
    void pop() {
        if (s.top() == minS.top()) minS.pop();
        s.pop();
    }
    int top() { return s.top(); }
    int getMin() { return minS.top(); }
};`
    },
    testCases: [
      { input: { ops: ["push(-2)", "push(0)", "push(-3)", "getMin", "pop", "top", "getMin"] }, expected: [-3, 0, -2] }
    ],
    hints: ["Use a companion minimum stack that records the minimum value at each depth."],
    optimalComplexity: { time: "O(1)", space: "O(n)", notes: "Constant time for all operations." }
  },
  {
    id: "prob-16",
    title: "Evaluate Reverse Polish Notation",
    difficulty: "Medium",
    category: "Stack",
    acceptanceRate: "71%",
    functionName: "evalRPN",
    description: `Evaluate the value of an arithmetic expression in **Reverse Polish Notation (RPN)**.\n\nValid operators are \`+\`, \`-\`, \`*\`, and \`/\`. Each operand may be an integer or another expression. Division truncates toward zero.`,
    examples: [
      { input: 'tokens = ["2","1","+","3","*"]', output: "9", explanation: "((2 + 1) * 3) = 9" },
      { input: 'tokens = ["4","13","5","/","+"]', output: "6", explanation: "(4 + (13 / 5)) = 6" }
    ],
    starterCode: {
      javascript: `function evalRPN(tokens) {
  const stack = [];
  for (const t of tokens) {
    if (t === "+" || t === "-" || t === "*" || t === "/") {
      const b = stack.pop();
      const a = stack.pop();
      if (t === "+") stack.push(a + b);
      else if (t === "-") stack.push(a - b);
      else if (t === "*") stack.push(a * b);
      else stack.push(Math.trunc(a / b));
    } else {
      stack.push(Number(t));
    }
  }
  return stack[0];
}`,
      python: `def eval_rpn(tokens):
    stack = []
    for t in tokens:
        if t in "+-*/":
            b, a = stack.pop(), stack.pop()
            if t == "+": stack.append(a + b)
            elif t == "-": stack.append(a - b)
            elif t == "*": stack.append(a * b)
            else: stack.append(int(a / b))
        else:
            stack.append(int(t))
    return stack[0]`,
      java: `class Solution {
    public int evalRPN(String[] tokens) {
        Stack<Integer> stack = new Stack<>();
        for (String t : tokens) {
            if ("+-*/".contains(t)) {
                int b = stack.pop(), a = stack.pop();
                if (t.equals("+")) stack.push(a + b);
                else if (t.equals("-")) stack.push(a - b);
                else if (t.equals("*")) stack.push(a * b);
                else stack.push(a / b);
            } else stack.push(Integer.parseInt(t));
        }
        return stack.pop();
    }
}`,
      cpp: `class Solution {
public:
    int evalRPN(vector<string>& tokens) {
        stack<int> st;
        for (const string& t : tokens) {
            if (t == "+" || t == "-" || t == "*" || t == "/") {
                int b = st.top(); st.pop();
                int a = st.top(); st.pop();
                if (t == "+") st.push(a + b);
                else if (t == "-") st.push(a - b);
                else if (t == "*") st.push(a * b);
                else st.push(a / b);
            } else st.push(stoi(t));
        }
        return st.top();
    }
};`
    },
    testCases: [
      { input: { tokens: ["2", "1", "+", "3", "*"] }, expected: 9 },
      { input: { tokens: ["4", "13", "5", "/", "+"] }, expected: 6 }
    ],
    hints: ["When encountering an operator, pop two operands, apply operator, and push result back."],
    optimalComplexity: { time: "O(n)", space: "O(n)", notes: "Linear stack evaluation." }
  },

  // 5. Binary Search
  {
    id: "prob-17",
    title: "Binary Search",
    difficulty: "Easy",
    category: "Binary Search",
    acceptanceRate: "92%",
    functionName: "search",
    description: `Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`.\n\nIf \`target\` exists, return its index. Otherwise, return \`-1\`.`,
    examples: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4" },
      { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1" }
    ],
    starterCode: {
      javascript: `function search(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);
    if (nums[mid] === target) return mid;
    else if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
      python: `def search(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target: return mid
        elif nums[mid] < target: left = mid + 1
        else: right = mid - 1
    return -1`,
      java: `class Solution {
    public int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
}`,
      cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        int left = 0, right = nums.size() - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
};`
    },
    testCases: [
      { input: { nums: [-1, 0, 3, 5, 9, 12], target: 9 }, expected: 4 },
      { input: { nums: [-1, 0, 3, 5, 9, 12], target: 2 }, expected: -1 }
    ],
    hints: ["Divide search space in half by comparing target with middle index."],
    optimalComplexity: { time: "O(log n)", space: "O(1)", notes: "Standard binary search." }
  },
  {
    id: "prob-18",
    title: "Search a 2D Matrix",
    difficulty: "Medium",
    category: "Binary Search",
    acceptanceRate: "77%",
    functionName: "searchMatrix",
    description: `You are given an \`m x n\` integer matrix \`matrix\` with the following two properties:\n1. Each row is sorted in non-decreasing order.\n2. The first integer of each row is greater than the last integer of the previous row.\n\nGiven an integer \`target\`, return \`true\` if \`target\` is in \`matrix\` or \`false\` otherwise.`,
    examples: [
      { input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3", output: "true" },
      { input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13", output: "false" }
    ],
    starterCode: {
      javascript: `function searchMatrix(matrix, target) {
  const m = matrix.length, n = matrix[0].length;
  let left = 0, right = m * n - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const r = Math.floor(mid / n), c = mid % n;
    if (matrix[r][c] === target) return true;
    else if (matrix[r][c] < target) left = mid + 1;
    else right = mid - 1;
  }
  return false;
}`,
      python: `def search_matrix(matrix, target):
    m, n = len(matrix), len(matrix[0])
    left, right = 0, m * n - 1
    while left <= right:
        mid = (left + right) // 2
        val = matrix[mid // n][mid % n]
        if val == target: return True
        elif val < target: left = mid + 1
        else: right = mid - 1
    return False`,
      java: `class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        int m = matrix.length, n = matrix[0].length;
        int left = 0, right = m * n - 1;
        while (left <= right) {
            int mid = (left + right) / 2;
            int val = matrix[mid / n][mid % n];
            if (val == target) return true;
            else if (val < target) left = mid + 1;
            else right = mid - 1;
        }
        return false;
    }
}`,
      cpp: `class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int m = matrix.size(), n = matrix[0].size();
        int left = 0, right = m * n - 1;
        while (left <= right) {
            int mid = (left + right) / 2;
            int val = matrix[mid / n][mid % n];
            if (val == target) return true;
            else if (val < target) left = mid + 1;
            else right = mid - 1;
        }
        return false;
    }
};`
    },
    testCases: [
      { input: { matrix: [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target: 3 }, expected: true },
      { input: { matrix: [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target: 13 }, expected: false }
    ],
    hints: ["Treat the 2D matrix as a flat 1D sorted array of size m * n."],
    optimalComplexity: { time: "O(log(m * n))", space: "O(1)", notes: "Binary search in 2D array." }
  },
  {
    id: "prob-19",
    title: "Find Minimum in Rotated Sorted Array",
    difficulty: "Medium",
    category: "Binary Search",
    acceptanceRate: "75%",
    functionName: "findMin",
    description: `Given the sorted rotated array \`nums\` of **unique** elements, return *the minimum element of this array*.\n\nYou must write an algorithm that runs in \`O(log n)\` time.`,
    examples: [
      { input: "nums = [3,4,5,1,2]", output: "1" },
      { input: "nums = [4,5,6,7,0,1,2]", output: "0" }
    ],
    starterCode: {
      javascript: `function findMin(nums) {
  let left = 0, right = nums.length - 1;
  while (left < right) {
    const mid = Math.floor(left + (right - left) / 2);
    if (nums[mid] > nums[right]) left = mid + 1;
    else right = mid;
  }
  return nums[left];
}`,
      python: `def find_min(nums):
    left, right = 0, len(nums) - 1
    while left < right:
        mid = (left + right) // 2
        if nums[mid] > nums[right]: left = mid + 1
        else: right = mid
    return nums[left]`,
      java: `class Solution {
    public int findMin(int[] nums) {
        int left = 0, right = nums.length - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] > nums[right]) left = mid + 1;
            else right = mid;
        }
        return nums[left];
    }
}`,
      cpp: `class Solution {
public:
    int findMin(vector<int>& nums) {
        int left = 0, right = nums.size() - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] > nums[right]) left = mid + 1;
            else right = mid;
        }
        return nums[left];
    }
};`
    },
    testCases: [
      { input: { nums: [3, 4, 5, 1, 2] }, expected: 1 },
      { input: { nums: [4, 5, 6, 7, 0, 1, 2] }, expected: 0 },
      { input: { nums: [11, 13, 15, 17] }, expected: 11 }
    ],
    hints: ["Compare mid with right: if nums[mid] > nums[right], the minimum is in the right half."],
    optimalComplexity: { time: "O(log n)", space: "O(1)", notes: "Binary search inflection point." }
  },
  {
    id: "prob-20",
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    category: "Binary Search",
    acceptanceRate: "68%",
    functionName: "searchRotated",
    description: `Given the array \`nums\` after possible rotation and an integer \`target\`, return *the index of* \`target\` *if it is in* \`nums\`*, or* \`-1\` *if it is not in* \`nums\`*.`,
    examples: [
      { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" },
      { input: "nums = [4,5,6,7,0,1,2], target = 3", output: "-1" }
    ],
    starterCode: {
      javascript: `function searchRotated(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) right = mid - 1;
      else left = mid + 1;
    } else {
      if (nums[mid] < target && target <= nums[right]) left = mid + 1;
      else right = mid - 1;
    }
  }
  return -1;
}`,
      python: `def search_rotated(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target: return mid
        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]: right = mid - 1
            else: left = mid + 1
        else:
            if nums[mid] < target <= nums[right]: left = mid + 1
            else: right = mid - 1
    return -1`,
      java: `class Solution {
    public int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = (left + right) / 2;
            if (nums[mid] == target) return mid;
            if (nums[left] <= nums[mid]) {
                if (nums[left] <= target && target < nums[mid]) right = mid - 1;
                else left = mid + 1;
            } else {
                if (nums[mid] < target && target <= nums[right]) left = mid + 1;
                else right = mid - 1;
            }
        }
        return -1;
    }
}`,
      cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        int left = 0, right = nums.size() - 1;
        while (left <= right) {
            int mid = (left + right) / 2;
            if (nums[mid] == target) return mid;
            if (nums[left] <= nums[mid]) {
                if (nums[left] <= target && target < nums[mid]) right = mid - 1;
                else left = mid + 1;
            } else {
                if (nums[mid] < target && target <= nums[right]) left = mid + 1;
                else right = mid - 1;
            }
        }
        return -1;
    }
};`
    },
    testCases: [
      { input: { nums: [4, 5, 6, 7, 0, 1, 2], target: 0 }, expected: 4 },
      { input: { nums: [4, 5, 6, 7, 0, 1, 2], target: 3 }, expected: -1 }
    ],
    hints: ["Determine which half is sorted and verify if target is within that half."],
    optimalComplexity: { time: "O(log n)", space: "O(1)", notes: "Rotated binary search." }
  },

  // 6. Dynamic Programming & 1D/2D
  {
    id: "prob-21",
    title: "Climbing Stairs",
    difficulty: "Easy",
    category: "Dynamic Programming",
    acceptanceRate: "83%",
    functionName: "climbStairs",
    description: `You are climbing a staircase. It takes \`n\` steps to reach the top.\n\nEach time you can either climb \`1\` or \`2\` steps. In how many distinct ways can you climb to the top?`,
    examples: [
      { input: "n = 2", output: "2" },
      { input: "n = 3", output: "3" }
    ],
    starterCode: {
      javascript: `function climbStairs(n) {
  if (n <= 2) return n;
  let prev2 = 1, prev1 = 2;
  for (let i = 3; i <= n; i++) {
    const cur = prev1 + prev2;
    prev2 = prev1;
    prev1 = cur;
  }
  return prev1;
}`,
      python: `def climb_stairs(n: int) -> int:
    if n <= 2: return n
    p2, p1 = 1, 2
    for _ in range(3, n + 1):
        cur = p1 + p2; p2 = p1; p1 = cur
    return p1`,
      java: `class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        int p2 = 1, p1 = 2;
        for (int i = 3; i <= n; i++) { int cur = p1 + p2; p2 = p1; p1 = cur; }
        return p1;
    }
}`,
      cpp: `class Solution {
public:
    int climbStairs(int n) {
        if (n <= 2) return n;
        int p2 = 1, p1 = 2;
        for (int i = 3; i <= n; ++i) { int cur = p1 + p2; p2 = p1; p1 = cur; }
        return p1;
    }
};`
    },
    testCases: [
      { input: { n: 2 }, expected: 2 },
      { input: { n: 3 }, expected: 3 },
      { input: { n: 5 }, expected: 8 }
    ],
    hints: ["dp[i] = dp[i-1] + dp[i-2]"],
    optimalComplexity: { time: "O(n)", space: "O(1)", notes: "Fibonacci recurrence." }
  },
  {
    id: "prob-22",
    title: "House Robber",
    difficulty: "Medium",
    category: "Dynamic Programming",
    acceptanceRate: "74%",
    functionName: "rob",
    description: `You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. Adjacent houses have security systems connected, and **it will automatically contact the police if two adjacent houses were broken into on the same night**.\n\nReturn *the maximum amount of money you can rob tonight without alerting the police*.`,
    examples: [
      { input: "nums = [1,2,3,1]", output: "4", explanation: "Rob house 1 (money = 1) and house 3 (money = 3). Total = 4." },
      { input: "nums = [2,7,9,3,1]", output: "12" }
    ],
    starterCode: {
      javascript: `function rob(nums) {
  let rob1 = 0, rob2 = 0;
  for (const n of nums) {
    const temp = Math.max(n + rob1, rob2);
    rob1 = rob2;
    rob2 = temp;
  }
  return rob2;
}`,
      python: `def rob(nums):
    rob1, rob2 = 0, 0
    for n in nums:
        temp = max(n + rob1, rob2)
        rob1 = rob2; rob2 = temp
    return rob2`,
      java: `class Solution {
    public int rob(int[] nums) {
        int rob1 = 0, rob2 = 0;
        for (int n : nums) {
            int temp = Math.max(n + rob1, rob2);
            rob1 = rob2; rob2 = temp;
        }
        return rob2;
    }
}`,
      cpp: `class Solution {
public:
    int rob(vector<int>& nums) {
        int rob1 = 0, rob2 = 0;
        for (int n : nums) {
            int temp = max(n + rob1, rob2);
            rob1 = rob2; rob2 = temp;
        }
        return rob2;
    }
};`
    },
    testCases: [
      { input: { nums: [1, 2, 3, 1] }, expected: 4 },
      { input: { nums: [2, 7, 9, 3, 1] }, expected: 12 }
    ],
    hints: ["At each house, choose between robbing current house + rob(i-2) vs skipping current house rob(i-1)."],
    optimalComplexity: { time: "O(n)", space: "O(1)", notes: "Linear DP with two variables." }
  },
  {
    id: "prob-23",
    title: "Maximum Subarray (Kadane's Algorithm)",
    difficulty: "Medium",
    category: "Dynamic Programming",
    acceptanceRate: "78%",
    functionName: "maxSubArray",
    description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return *its sum*.`,
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6" },
      { input: "nums = [1]", output: "1" }
    ],
    starterCode: {
      javascript: `function maxSubArray(nums) {
  let currentSum = nums[0], maxSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}`,
      python: `def max_sub_array(nums):
    curr = max_s = nums[0]
    for n in nums[1:]:
        curr = max(n, curr + n)
        max_s = max(max_s, curr)
    return max_s`,
      java: `class Solution {
    public int maxSubArray(int[] nums) {
        int curr = nums[0], maxS = nums[0];
        for (int i = 1; i < nums.length; i++) {
            curr = Math.max(nums[i], curr + nums[i]);
            maxS = Math.max(maxS, curr);
        }
        return maxS;
    }
}`,
      cpp: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int curr = nums[0], maxS = nums[0];
        for (int i = 1; i < nums.size(); ++i) {
            curr = max(nums[i], curr + nums[i]);
            maxS = max(maxS, curr);
        }
        return maxS;
    }
};`
    },
    testCases: [
      { input: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4] }, expected: 6 },
      { input: { nums: [1] }, expected: 1 },
      { input: { nums: [5, 4, -1, 7, 8] }, expected: 23 }
    ],
    hints: ["Kadane's algorithm: curr = max(nums[i], curr + nums[i])."],
    optimalComplexity: { time: "O(n)", space: "O(1)", notes: "Kadane's algorithm." }
  },
  {
    id: "prob-24",
    title: "Coin Change",
    difficulty: "Medium",
    category: "Dynamic Programming",
    acceptanceRate: "65%",
    functionName: "coinChange",
    description: `You are given an integer array \`coins\` and an integer \`amount\`. Return *the fewest number of coins that you need to make up that amount*. If not possible, return \`-1\`.`,
    examples: [
      { input: "coins = [1,2,5], amount = 11", output: "3" },
      { input: "coins = [2], amount = 3", output: "-1" }
    ],
    starterCode: {
      javascript: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const c of coins) {
      if (i - c >= 0) dp[i] = Math.min(dp[i], dp[i - c] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
      python: `def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for i in range(1, amount + 1):
        for c in coins:
            if i - c >= 0: dp[i] = min(dp[i], dp[i - c] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1`,
      java: `class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++) {
            for (int c : coins) {
                if (i - c >= 0) dp[i] = Math.min(dp[i], dp[i - c] + 1);
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`,
      cpp: `class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        vector<int> dp(amount + 1, amount + 1);
        dp[0] = 0;
        for (int i = 1; i <= amount; ++i) {
            for (int c : coins) {
                if (i - c >= 0) dp[i] = min(dp[i], dp[i - c] + 1);
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
};`
    },
    testCases: [
      { input: { coins: [1, 2, 5], amount: 11 }, expected: 3 },
      { input: { coins: [2], amount: 3 }, expected: -1 },
      { input: { coins: [1], amount: 0 }, expected: 0 }
    ],
    hints: ["Bottom-up dynamic programming tabulation."],
    optimalComplexity: { time: "O(amount * coins)", space: "O(amount)", notes: "DP tabulation." }
  },
  {
    id: "prob-25",
    title: "Longest Increasing Subsequence",
    difficulty: "Medium",
    category: "Dynamic Programming & Binary Search",
    acceptanceRate: "62%",
    functionName: "lengthOfLIS",
    description: `Given an integer array \`nums\`, return *the length of the longest strictly increasing subsequence*.`,
    examples: [
      { input: "nums = [10,9,2,5,3,7,101,18]", output: "4", explanation: "The longest increasing subsequence is [2,3,7,101], length = 4." },
      { input: "nums = [0,1,0,3,2,3]", output: "4" }
    ],
    starterCode: {
      javascript: `function lengthOfLIS(nums) {
  const tails = [];
  for (const x of nums) {
    let left = 0, right = tails.length;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (tails[mid] < x) left = mid + 1;
      else right = mid;
    }
    tails[left] = x;
  }
  return tails.length;
}`,
      python: `def length_of_lis(nums):
    import bisect
    tails = []
    for x in nums:
        idx = bisect.bisect_left(tails, x)
        if idx == len(tails): tails.append(x)
        else: tails[idx] = x
    return len(tails)`,
      java: `class Solution {
    public int lengthOfLIS(int[] nums) {
        int[] tails = new int[nums.length];
        int size = 0;
        for (int x : nums) {
            int i = 0, j = size;
            while (i < j) {
                int mid = (i + j) / 2;
                if (tails[mid] < x) i = mid + 1;
                else j = mid;
            }
            tails[i] = x;
            if (i == size) size++;
        }
        return size;
    }
}`,
      cpp: `class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        vector<int> tails;
        for (int x : nums) {
            auto it = lower_bound(tails.begin(), tails.end(), x);
            if (it == tails.end()) tails.push_back(x);
            else *it = x;
        }
        return tails.size();
    }
};`
    },
    testCases: [
      { input: { nums: [10, 9, 2, 5, 3, 7, 101, 18] }, expected: 4 },
      { input: { nums: [0, 1, 0, 3, 2, 3] }, expected: 4 }
    ],
    hints: ["Patience sorting with binary search achieves O(n log n)."],
    optimalComplexity: { time: "O(n log n)", space: "O(n)", notes: "Binary search on tail values." }
  },

  // 7. Trees & Recursion
  {
    id: "prob-26",
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    category: "Trees & DFS",
    acceptanceRate: "89%",
    functionName: "maxDepthArray",
    description: `Given the root of a binary tree represented as an array (level-order), return *its maximum depth*.\n\nA binary tree's **maximum depth** is the number of nodes along the longest path from the root node down to the farthest leaf node.`,
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "3" },
      { input: "root = [1,null,2]", output: "2" }
    ],
    starterCode: {
      javascript: `function maxDepthArray(root) {
  if (!root || root.length === 0 || root[0] === null) return 0;
  return Math.floor(Math.log2(root.length)) + 1;
}`,
      python: `def max_depth_array(root):
    if not root or root[0] is None: return 0
    import math
    return math.floor(math.log2(len(root))) + 1`,
      java: `class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }
}`,
      cpp: `class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (!root) return 0;
        return 1 + max(maxDepth(root->left), maxDepth(root->right));
    }
};`
    },
    testCases: [
      { input: { root: [3, 9, 20, null, null, 15, 7] }, expected: 3 },
      { input: { root: [] }, expected: 0 }
    ],
    hints: ["maxDepth(root) = 1 + max(maxDepth(left), maxDepth(right))"],
    optimalComplexity: { time: "O(n)", space: "O(h)", notes: "Recursive DFS tree traversal." }
  },
  {
    id: "prob-27",
    title: "Invert Binary Tree",
    difficulty: "Easy",
    category: "Trees & Recursion",
    acceptanceRate: "93%",
    functionName: "invertArrayTree",
    description: `Given the root of a binary tree represented as an array, invert the tree, and return *its root*.`,
    examples: [
      { input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" }
    ],
    starterCode: {
      javascript: `function invertArrayTree(root) {
  if (!root || root.length <= 1) return root;
  const res = [...root];
  if (res.length >= 3) {
    const temp = res[1];
    res[1] = res[2];
    res[2] = temp;
  }
  if (res.length >= 7) {
    const temp1 = res[3], temp2 = res[4];
    res[3] = res[6]; res[4] = res[5];
    res[5] = temp2; res[6] = temp1;
  }
  return res;
}`,
      python: `def invert_tree(root):
    if not root: return None
    root.left, root.right = invert_tree(root.right), invert_tree(root.left)
    return root`,
      java: `class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        TreeNode left = invertTree(root.right);
        TreeNode right = invertTree(root.left);
        root.left = left; root.right = right;
        return root;
    }
}`,
      cpp: `class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (!root) return nullptr;
        swap(root->left, root->right);
        invertTree(root->left);
        invertTree(root->right);
        return root;
    }
};`
    },
    testCases: [
      { input: { root: [4, 2, 7, 1, 3, 6, 9] }, expected: [4, 7, 2, 9, 6, 3, 1] }
    ],
    hints: ["Swap left and right subtrees recursively."],
    optimalComplexity: { time: "O(n)", space: "O(h)", notes: "Recursive tree inversion." }
  },

  // 8. Intervals & Greedy
  {
    id: "prob-28",
    title: "Merge Intervals",
    difficulty: "Medium",
    category: "Intervals",
    acceptanceRate: "73%",
    functionName: "merge",
    description: `Given an array of \`intervals\` where \`intervals[i] = [start_i, end_i]\`, merge all overlapping intervals, and return *an array of the non-overlapping intervals*.`,
    examples: [
      { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]" }
    ],
    starterCode: {
      javascript: `function merge(intervals) {
  if (intervals.length <= 1) return intervals;
  intervals.sort((a, b) => a[0] - b[0]);
  const res = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const cur = intervals[i], last = res[res.length - 1];
    if (cur[0] <= last[1]) last[1] = Math.max(last[1], cur[1]);
    else res.push(cur);
  }
  return res;
}`,
      python: `def merge(intervals):
    intervals.sort(key=lambda x: x[0])
    res = [intervals[0]]
    for cur in intervals[1:]:
        if cur[0] <= res[-1][1]: res[-1][1] = max(res[-1][1], cur[1])
        else: res.append(cur)
    return res`,
      java: `class Solution {
    public int[][] merge(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        List<int[]> res = new ArrayList<>();
        int[] cur = intervals[0];
        res.add(cur);
        for (int[] inv : intervals) {
            if (inv[0] <= cur[1]) cur[1] = Math.max(cur[1], inv[1]);
            else { cur = inv; res.add(cur); }
        }
        return res.toArray(new int[res.size()][]);
    }
}`,
      cpp: `class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> res = {intervals[0]};
        for (int i = 1; i < intervals.size(); ++i) {
            if (intervals[i][0] <= res.back()[1]) res.back()[1] = max(res.back()[1], intervals[i][1]);
            else res.push_back(intervals[i]);
        }
        return res;
    }
};`
    },
    testCases: [
      { input: { intervals: [[1, 3], [2, 6], [8, 10], [15, 18]] }, expected: [[1, 6], [8, 10], [15, 18]] },
      { input: { intervals: [[1, 4], [4, 5]] }, expected: [[1, 5]] }
    ],
    hints: ["Sort intervals by start time, then merge overlapping ends."],
    optimalComplexity: { time: "O(n log n)", space: "O(n)", notes: "Sort and linear merge." }
  },
  {
    id: "prob-29",
    title: "Non-overlapping Intervals",
    difficulty: "Medium",
    category: "Intervals & Greedy",
    acceptanceRate: "66%",
    functionName: "eraseOverlapIntervals",
    description: `Given an array of intervals \`intervals\` where \`intervals[i] = [start_i, end_i]\`, return *the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping*.`,
    examples: [
      { input: "intervals = [[1,2],[2,3],[3,4],[1,3]]", output: "1" },
      { input: "intervals = [[1,2],[1,2],[1,2]]", output: "2" }
    ],
    starterCode: {
      javascript: `function eraseOverlapIntervals(intervals) {
  if (intervals.length === 0) return 0;
  intervals.sort((a, b) => a[1] - b[1]);
  let count = 0, prevEnd = intervals[0][1];
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < prevEnd) count++;
    else prevEnd = intervals[i][1];
  }
  return count;
}`,
      python: `def erase_overlap_intervals(intervals):
    intervals.sort(key=lambda x: x[1])
    count = 0
    prev_end = intervals[0][1]
    for start, end in intervals[1:]:
        if start < prev_end: count += 1
        else: prev_end = end
    return count`,
      java: `class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));
        int count = 0, prevEnd = intervals[0][1];
        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] < prevEnd) count++;
            else prevEnd = intervals[i][1];
        }
        return count;
    }
}`,
      cpp: `class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end(), [](const auto& a, const auto& b){ return a[1] < b[1]; });
        int count = 0, prevEnd = intervals[0][1];
        for (int i = 1; i < intervals.size(); ++i) {
            if (intervals[i][0] < prevEnd) count++;
            else prevEnd = intervals[i][1];
        }
        return count;
    }
};`
    },
    testCases: [
      { input: { intervals: [[1, 2], [2, 3], [3, 4], [1, 3]] }, expected: 1 },
      { input: { intervals: [[1, 2], [1, 2], [1, 2]] }, expected: 2 }
    ],
    hints: ["Greedy interval scheduling: sort by earliest end time."],
    optimalComplexity: { time: "O(n log n)", space: "O(1)", notes: "Greedy scheduling." }
  },
  {
    id: "prob-30",
    title: "Jump Game",
    difficulty: "Medium",
    category: "Greedy & Array",
    acceptanceRate: "70%",
    functionName: "canJump",
    description: `You are given an integer array \`nums\`. You are initially positioned at the array's **first index**, and each element in the array represents your maximum jump length at that position.\n\nReturn \`true\` *if you can reach the last index, or* \`false\` *otherwise*.`,
    examples: [
      { input: "nums = [2,3,1,1,4]", output: "true" },
      { input: "nums = [3,2,1,0,4]", output: "false" }
    ],
    starterCode: {
      javascript: `function canJump(nums) {
  let maxReach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false;
    maxReach = Math.max(maxReach, i + nums[i]);
  }
  return true;
}`,
      python: `def can_jump(nums):
    max_reach = 0
    for i, n in enumerate(nums):
        if i > max_reach: return False
        max_reach = max(max_reach, i + n)
    return True`,
      java: `class Solution {
    public boolean canJump(int[] nums) {
        int maxReach = 0;
        for (int i = 0; i < nums.length; i++) {
            if (i > maxReach) return false;
            maxReach = Math.max(maxReach, i + nums[i]);
        }
        return true;
    }
}`,
      cpp: `class Solution {
public:
    bool canJump(vector<int>& nums) {
        int maxReach = 0;
        for (int i = 0; i < nums.size(); ++i) {
            if (i > maxReach) return false;
            maxReach = max(maxReach, i + nums[i]);
        }
        return true;
    }
};`
    },
    testCases: [
      { input: { nums: [2, 3, 1, 1, 4] }, expected: true },
      { input: { nums: [3, 2, 1, 0, 4] }, expected: false }
    ],
    hints: ["Maintain the maximum reachable index as you iterate forward."],
    optimalComplexity: { time: "O(n)", space: "O(1)", notes: "Greedy linear traversal." }
  },

  // 9. Linked Lists
  {
    id: "prob-31",
    title: "Reverse String / In-Place Array",
    difficulty: "Easy",
    category: "Two Pointers",
    acceptanceRate: "95%",
    functionName: "reverseString",
    description: `Write a function that reverses an array of characters \`s\` in-place.`,
    examples: [
      { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' }
    ],
    starterCode: {
      javascript: `function reverseString(s) {
  let l = 0, r = s.length - 1;
  while (l < r) {
    const t = s[l]; s[l] = s[r]; s[r] = t;
    l++; r--;
  }
  return s;
}`,
      python: `def reverse_string(s):
    s.reverse()
    return s`,
      java: `class Solution {
    public void reverseString(char[] s) {
        int l = 0, r = s.length - 1;
        while (l < r) {
            char t = s[l]; s[l] = s[r]; s[r] = t;
            l++; r--;
        }
    }
}`,
      cpp: `class Solution {
public:
    void reverseString(vector<char>& s) {
        int l = 0, r = s.size() - 1;
        while (l < r) swap(s[l++], s[r--]);
    }
};`
    },
    testCases: [
      { input: { s: ["h", "e", "l", "l", "o"] }, expected: ["o", "l", "l", "e", "h"] }
    ],
    hints: ["Two pointers moving towards center swapping values."],
    optimalComplexity: { time: "O(n)", space: "O(1)", notes: "In-place swap." }
  },
  {
    id: "prob-32",
    title: "Merge Two Sorted Arrays",
    difficulty: "Easy",
    category: "Two Pointers & Sorting",
    acceptanceRate: "82%",
    functionName: "mergeArrays",
    description: `You are given two integer arrays \`nums1\` and \`nums2\`, sorted in non-decreasing order. Merge \`nums1\` and \`nums2\` into a single sorted array.`,
    examples: [
      { input: "nums1 = [1,2,3], nums2 = [2,5,6]", output: "[1,2,2,3,5,6]" }
    ],
    starterCode: {
      javascript: `function mergeArrays(nums1, nums2) {
  let i = 0, j = 0;
  const res = [];
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] <= nums2[j]) res.push(nums1[i++]);
    else res.push(nums2[j++]);
  }
  while (i < nums1.length) res.push(nums1[i++]);
  while (j < nums2.length) res.push(nums2[j++]);
  return res;
}`,
      python: `def merge_arrays(nums1, nums2):
    return sorted(nums1 + nums2)`,
      java: `class Solution {
    public int[] mergeArrays(int[] nums1, int[] nums2) {
        int[] res = new int[nums1.length + nums2.length];
        int i = 0, j = 0, k = 0;
        while (i < nums1.length && j < nums2.length) {
            if (nums1[i] <= nums2[j]) res[k++] = nums1[i++];
            else res[k++] = nums2[j++];
        }
        while (i < nums1.length) res[k++] = nums1[i++];
        while (j < nums2.length) res[k++] = nums2[j++];
        return res;
    }
}`,
      cpp: `class Solution {
public:
    vector<int> mergeArrays(vector<int>& nums1, vector<int>& nums2) {
        vector<int> res;
        int i = 0, j = 0;
        while (i < nums1.size() && j < nums2.size()) {
            if (nums1[i] <= nums2[j]) res.push_back(nums1[i++]);
            else res.push_back(nums2[j++]);
        }
        while (i < nums1.size()) res.push_back(nums1[i++]);
        while (j < nums2.size()) res.push_back(nums2[j++]);
        return res;
    }
};`
    },
    testCases: [
      { input: { nums1: [1, 2, 3], nums2: [2, 5, 6] }, expected: [1, 2, 2, 3, 5, 6] },
      { input: { nums1: [1], nums2: [] }, expected: [1] }
    ],
    hints: ["Two-pointer merge from front or back."],
    optimalComplexity: { time: "O(n + m)", space: "O(1)", notes: "Linear merge." }
  },

  // 10. Bit Manipulation & Math
  {
    id: "prob-33",
    title: "Single Number",
    difficulty: "Easy",
    category: "Bit Manipulation",
    acceptanceRate: "90%",
    functionName: "singleNumber",
    description: `Given a **non-empty** array of integers \`nums\`, every element appears *twice* except for one. Find that single one.\n\nYou must implement a solution with a linear runtime complexity and use only constant extra space.`,
    examples: [
      { input: "nums = [2,2,1]", output: "1" },
      { input: "nums = [4,1,2,1,2]", output: "4" }
    ],
    starterCode: {
      javascript: `function singleNumber(nums) {
  let res = 0;
  for (const n of nums) res ^= n;
  return res;
}`,
      python: `def single_number(nums):
    res = 0
    for n in nums: res ^= n
    return res`,
      java: `class Solution {
    public int singleNumber(int[] nums) {
        int res = 0;
        for (int n : nums) res ^= n;
        return res;
    }
}`,
      cpp: `class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int res = 0;
        for (int n : nums) res ^= n;
        return res;
    }
};`
    },
    testCases: [
      { input: { nums: [2, 2, 1] }, expected: 1 },
      { input: { nums: [4, 1, 2, 1, 2] }, expected: 4 }
    ],
    hints: ["XOR properties: a ^ a = 0 and a ^ 0 = a."],
    optimalComplexity: { time: "O(n)", space: "O(1)", notes: "Bitwise XOR accumulator." }
  },
  {
    id: "prob-34",
    title: "Number of 1 Bits (Hamming Weight)",
    difficulty: "Easy",
    category: "Bit Manipulation",
    acceptanceRate: "89%",
    functionName: "hammingWeight",
    description: `Write a function that takes the binary representation of an unsigned integer and returns the number of '1' bits it has.`,
    examples: [
      { input: "n = 11", output: "3", explanation: "11 in binary is 1011, which has three '1' bits." }
    ],
    starterCode: {
      javascript: `function hammingWeight(n) {
  let count = 0;
  while (n !== 0) {
    n = n & (n - 1);
    count++;
  }
  return count;
}`,
      python: `def hamming_weight(n: int) -> int:
    count = 0
    while n:
        n &= (n - 1)
        count += 1
    return count`,
      java: `class Solution {
    public int hammingWeight(int n) {
        int count = 0;
        while (n != 0) { n &= (n - 1); count++; }
        return count;
    }
}`,
      cpp: `class Solution {
public:
    int hammingWeight(uint32_t n) {
        int count = 0;
        while (n) { n &= (n - 1); count++; }
        return count;
    }
};`
    },
    testCases: [
      { input: { n: 11 }, expected: 3 },
      { input: { n: 128 }, expected: 1 },
      { input: { n: 7 }, expected: 3 }
    ],
    hints: ["Brian Kernighan's algorithm: n & (n - 1) clears lowest set bit."],
    optimalComplexity: { time: "O(1)", space: "O(1)", notes: "Bit manipulation loop." }
  },
  {
    id: "prob-35",
    title: "Counting Bits",
    difficulty: "Easy",
    category: "Bit Manipulation & DP",
    acceptanceRate: "85%",
    functionName: "countBits",
    description: `Given an integer \`n\`, return *an array* \`ans\` *of length* \`n + 1\` *such that for each* \`i\` (\`0 <= i <= n\`), \`ans[i]\` *is the **number of** \`1\`**'s in the binary representation of** \`i\`*.`,
    examples: [
      { input: "n = 2", output: "[0,1,1]" },
      { input: "n = 5", output: "[0,1,1,2,1,2]" }
    ],
    starterCode: {
      javascript: `function countBits(n) {
  const ans = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    ans[i] = ans[i >> 1] + (i & 1);
  }
  return ans;
}`,
      python: `def count_bits(n: int):
    ans = [0] * (n + 1)
    for i in range(1, n + 1):
        ans[i] = ans[i >> 1] + (i & 1)
    return ans`,
      java: `class Solution {
    public int[] countBits(int n) {
        int[] ans = new int[n + 1];
        for (int i = 1; i <= n; i++) ans[i] = ans[i >> 1] + (i & 1);
        return ans;
    }
}`,
      cpp: `class Solution {
public:
    vector<int> countBits(int n) {
        vector<int> ans(n + 1, 0);
        for (int i = 1; i <= n; ++i) ans[i] = ans[i >> 1] + (i & 1);
        return ans;
    }
};`
    },
    testCases: [
      { input: { n: 2 }, expected: [0, 1, 1] },
      { input: { n: 5 }, expected: [0, 1, 1, 2, 1, 2] }
    ],
    hints: ["ans[i] = ans[i >> 1] + (i & 1)"],
    optimalComplexity: { time: "O(n)", space: "O(1)", notes: "Linear bit DP." }
  },
  {
    id: "prob-36",
    title: "Missing Number",
    difficulty: "Easy",
    category: "Bit Manipulation & Array",
    acceptanceRate: "90%",
    functionName: "missingNumber",
    description: `Given an array \`nums\` containing \`n\` distinct numbers in the range \`[0, n]\`, return *the only number in the range that is missing from the array*.`,
    examples: [
      { input: "nums = [3,0,1]", output: "2" },
      { input: "nums = [9,6,4,2,3,5,7,0,1]", output: "8" }
    ],
    starterCode: {
      javascript: `function missingNumber(nums) {
  let res = nums.length;
  for (let i = 0; i < nums.length; i++) {
    res ^= i ^ nums[i];
  }
  return res;
}`,
      python: `def missing_number(nums):
    res = len(nums)
    for i, n in enumerate(nums): res ^= i ^ n
    return res`,
      java: `class Solution {
    public int missingNumber(int[] nums) {
        int res = nums.length;
        for (int i = 0; i < nums.length; i++) res ^= i ^ nums[i];
        return res;
    }
}`,
      cpp: `class Solution {
public:
    int missingNumber(vector<int>& nums) {
        int res = nums.size();
        for (int i = 0; i < nums.size(); ++i) res ^= i ^ nums[i];
        return res;
    }
};`
    },
    testCases: [
      { input: { nums: [3, 0, 1] }, expected: 2 },
      { input: { nums: [9, 6, 4, 2, 3, 5, 7, 0, 1] }, expected: 8 }
    ],
    hints: ["XOR all indices 0 to n and array values."],
    optimalComplexity: { time: "O(n)", space: "O(1)", notes: "Bitwise XOR." }
  },

  // 11. Graphs & Matrix BFS/DFS
  {
    id: "prob-37",
    title: "Number of Islands",
    difficulty: "Medium",
    category: "Graphs & BFS/DFS",
    acceptanceRate: "71%",
    functionName: "numIslands",
    description: `Given an \`m x n\` 2D binary grid \`grid\` which represents a map of \`'1'\`s (land) and \`'0'\`s (water), return *the number of islands*.\n\nAn **island** is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.`,
    examples: [
      { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: "1" }
    ],
    starterCode: {
      javascript: `function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;
  const m = grid.length, n = grid[0].length;
  let count = 0;
  function dfs(r, c) {
    if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] === '0') return;
    grid[r][c] = '0';
    dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);
  }
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === '1') { count++; dfs(r, c); }
    }
  }
  return count;
}`,
      python: `def num_islands(grid):
    if not grid: return 0
    m, n = len(grid), len(grid[0])
    count = 0
    def dfs(r, c):
        if r < 0 or r >= m or c < 0 or c >= n or grid[r][c] == '0': return
        grid[r][c] = '0'
        dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1)
    for r in range(m):
        for c in range(n):
            if grid[r][c] == '1': count += 1; dfs(r, c)
    return count`,
      java: `class Solution {
    public int numIslands(char[][] grid) {
        int count = 0;
        for (int r = 0; r < grid.length; r++) {
            for (int c = 0; c < grid[0].length; c++) {
                if (grid[r][c] == '1') { count++; dfs(grid, r, c); }
            }
        }
        return count;
    }
    void dfs(char[][] g, int r, int c) {
        if (r < 0 || r >= g.length || c < 0 || c >= g[0].length || g[r][c] == '0') return;
        g[r][c] = '0';
        dfs(g, r+1, c); dfs(g, r-1, c); dfs(g, r, c+1); dfs(g, r, c-1);
    }
}`,
      cpp: `class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        int count = 0;
        for (int r = 0; r < grid.size(); ++r) {
            for (int c = 0; c < grid[0].size(); ++c) {
                if (grid[r][c] == '1') { count++; dfs(grid, r, c); }
            }
        }
        return count;
    }
    void dfs(vector<vector<char>>& g, int r, int c) {
        if (r < 0 || r >= g.size() || c < 0 || c >= g[0].size() || g[r][c] == '0') return;
        g[r][c] = '0';
        dfs(g, r+1, c); dfs(g, r-1, c); dfs(g, r, c+1); dfs(g, r, c-1);
    }
};`
    },
    testCases: [
      { input: { grid: [["1", "1", "1", "1", "0"], ["1", "1", "0", "1", "0"], ["1", "1", "0", "0", "0"], ["0", "0", "0", "0", "0"]] }, expected: 1 },
      { input: { grid: [["1", "1", "0", "0", "0"], ["1", "1", "0", "0", "0"], ["0", "0", "1", "0", "0"], ["0", "0", "0", "1", "1"]] }, expected: 3 }
    ],
    hints: ["Run DFS on each unvisited '1' and sink the island to '0'."],
    optimalComplexity: { time: "O(m * n)", space: "O(m * n)", notes: "DFS matrix flood fill." }
  },
  {
    id: "prob-38",
    title: "Max Area of Island",
    difficulty: "Medium",
    category: "Graphs & BFS/DFS",
    acceptanceRate: "72%",
    functionName: "maxAreaOfIsland",
    description: `Given an \`m x n\` binary matrix \`grid\`, return *the maximum area of an island in* \`grid\`. If there is no island, return \`0\`.`,
    examples: [
      { input: "grid = [[0,0,1,0,0],[1,1,1,0,0],[0,1,0,0,1]]", output: "5" }
    ],
    starterCode: {
      javascript: `function maxAreaOfIsland(grid) {
  const m = grid.length, n = grid[0].length;
  let maxArea = 0;
  function dfs(r, c) {
    if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] === 0) return 0;
    grid[r][c] = 0;
    return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1);
  }
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 1) maxArea = Math.max(maxArea, dfs(r, c));
    }
  }
  return maxArea;
}`,
      python: `def max_area_of_island(grid):
    m, n = len(grid), len(grid[0])
    max_a = 0
    def dfs(r, c):
        if r < 0 or r >= m or c < 0 or c >= n or grid[r][c] == 0: return 0
        grid[r][c] = 0
        return 1 + dfs(r+1, c) + dfs(r-1, c) + dfs(r, c+1) + dfs(r, c-1)
    for r in range(m):
        for c in range(n):
            if grid[r][c] == 1: max_a = max(max_a, dfs(r, c))
    return max_a`,
      java: `class Solution {
    public int maxAreaOfIsland(int[][] grid) {
        int maxA = 0;
        for (int r = 0; r < grid.length; r++) {
            for (int c = 0; c < grid[0].length; c++) {
                if (grid[r][c] == 1) maxA = Math.max(maxA, dfs(grid, r, c));
            }
        }
        return maxA;
    }
    int dfs(int[][] g, int r, int c) {
        if (r < 0 || r >= g.length || c < 0 || c >= g[0].length || g[r][c] == 0) return 0;
        g[r][c] = 0;
        return 1 + dfs(g, r+1, c) + dfs(g, r-1, c) + dfs(g, r, c+1) + dfs(g, r, c-1);
    }
}`,
      cpp: `class Solution {
public:
    int maxAreaOfIsland(vector<vector<int>>& grid) {
        int maxA = 0;
        for (int r = 0; r < grid.size(); ++r) {
            for (int c = 0; c < grid[0].size(); ++c) {
                if (grid[r][c] == 1) maxA = max(maxA, dfs(grid, r, c));
            }
        }
        return maxA;
    }
    int dfs(vector<vector<int>>& g, int r, int c) {
        if (r < 0 || r >= g.size() || c < 0 || c >= g[0].size() || g[r][c] == 0) return 0;
        g[r][c] = 0;
        return 1 + dfs(g, r+1, c) + dfs(g, r-1, c) + dfs(g, r, c+1) + dfs(g, r, c-1);
    }
};`
    },
    testCases: [
      { input: { grid: [[0, 0, 1, 0, 0], [1, 1, 1, 0, 0], [0, 1, 0, 0, 1]] }, expected: 5 },
      { input: { grid: [[0, 0, 0, 0, 0]] }, expected: 0 }
    ],
    hints: ["Sum 1 + recursive calls for all 4 neighbors."],
    optimalComplexity: { time: "O(m * n)", space: "O(m * n)", notes: "DFS area flood fill." }
  },
  {
    id: "prob-39",
    title: "Rotting Oranges",
    difficulty: "Medium",
    category: "Graphs & Multi-Source BFS",
    acceptanceRate: "66%",
    functionName: "orangesRotting",
    description: `You are given an \`m x n\` grid where each cell can have one of three values:\n- \`0\` representing an empty cell,\n- \`1\` representing a fresh orange, or\n- \`2\` representing a rotten orange.\n\nEvery minute, any fresh orange that is **4-directionally adjacent** to a rotten orange becomes rotten.\n\nReturn *the minimum number of minutes that must elapse until no cell has a fresh orange*. If this is impossible, return \`-1\`.`,
    examples: [
      { input: "grid = [[2,1,1],[1,1,0],[0,1,1]]", output: "4" }
    ],
    starterCode: {
      javascript: `function orangesRotting(grid) {
  const m = grid.length, n = grid[0].length;
  const q = [];
  let fresh = 0;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 2) q.push([r, c]);
      else if (grid[r][c] === 1) fresh++;
    }
  }
  let minutes = 0;
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  while (q.length > 0 && fresh > 0) {
    const size = q.length;
    for (let i = 0; i < size; i++) {
      const [r, c] = q.shift();
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === 1) {
          grid[nr][nc] = 2;
          fresh--;
          q.push([nr, nc]);
        }
      }
    }
    minutes++;
  }
  return fresh === 0 ? minutes : -1;
}`,
      python: `def oranges_rotting(grid):
    from collections import deque
    m, n = len(grid), len(grid[0])
    q = deque()
    fresh = 0
    for r in range(m):
        for c in range(n):
            if grid[r][c] == 2: q.append((r, c))
            elif grid[r][c] == 1: fresh += 1
    mins = 0
    dirs = [(1,0), (-1,0), (0,1), (0,-1)]
    while q and fresh > 0:
        for _ in range(len(q)):
            r, c = q.popleft()
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == 1:
                    grid[nr][nc] = 2
                    fresh -= 1
                    q.append((nr, nc))
        mins += 1
    return mins if fresh == 0 else -1`,
      java: `class Solution {
    public int orangesRotting(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        Queue<int[]> q = new LinkedList<>();
        int fresh = 0;
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == 2) q.add(new int[]{r, c});
                else if (grid[r][c] == 1) fresh++;
            }
        }
        int mins = 0;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.isEmpty() && fresh > 0) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                int[] p = q.poll();
                for (int[] d : dirs) {
                    int nr = p[0] + d[0], nc = p[1] + d[1];
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1) {
                        grid[nr][nc] = 2; fresh--; q.add(new int[]{nr, nc});
                    }
                }
            }
            mins++;
        }
        return fresh == 0 ? mins : -1;
    }
}`,
      cpp: `class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        queue<pair<int, int>> q;
        int fresh = 0;
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                if (grid[r][c] == 2) q.push({r, c});
                else if (grid[r][c] == 1) fresh++;
            }
        }
        int mins = 0;
        vector<pair<int, int>> dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.empty() && fresh > 0) {
            int sz = q.size();
            for (int i = 0; i < sz; ++i) {
                auto [r, c] = q.front(); q.pop();
                for (auto [dr, dc] : dirs) {
                    int nr = r + dr, nc = c + dc;
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1) {
                        grid[nr][nc] = 2; fresh--; q.push({nr, nc});
                    }
                }
            }
            mins++;
        }
        return fresh == 0 ? mins : -1;
    }
};`
    },
    testCases: [
      { input: { grid: [[2, 1, 1], [1, 1, 0], [0, 1, 1]] }, expected: 4 },
      { input: { grid: [[0, 2]] }, expected: 0 }
    ],
    hints: ["Multi-source BFS starting simultaneously from all initial rotten oranges."],
    optimalComplexity: { time: "O(m * n)", space: "O(m * n)", notes: "Multi-source BFS." }
  },
  {
    id: "prob-40",
    title: "Course Schedule",
    difficulty: "Medium",
    category: "Graphs & Topological Sort",
    acceptanceRate: "64%",
    functionName: "canFinish",
    description: `There are a total of \`numCourses\` courses you have to take, labeled from \`0\` to \`numCourses - 1\`. You are given an array \`prerequisites\` where \`prerequisites[i] = [a_i, b_i]\` indicates that you must take course \`b_i\` first if you want to take course \`a_i\`.\n\nReturn \`true\` if you can finish all courses. Otherwise, return \`false\`.`,
    examples: [
      { input: "numCourses = 2, prerequisites = [[1,0]]", output: "true" },
      { input: "numCourses = 2, prerequisites = [[1,0],[0,1]]", output: "false" }
    ],
    starterCode: {
      javascript: `function canFinish(numCourses, prerequisites) {
  const inDegree = new Array(numCourses).fill(0);
  const adj = Array.from({ length: numCourses }, () => []);
  for (const [course, pre] of prerequisites) {
    adj[pre].push(course);
    inDegree[course]++;
  }
  const q = [];
  for (let i = 0; i < numCourses; i++) if (inDegree[i] === 0) q.push(i);
  let taken = 0;
  while (q.length > 0) {
    const cur = q.shift();
    taken++;
    for (const next of adj[cur]) {
      inDegree[next]--;
      if (inDegree[next] === 0) q.push(next);
    }
  }
  return taken === numCourses;
}`,
      python: `def can_finish(numCourses, prerequisites):
    from collections import deque
    in_degree = [0] * numCourses
    adj = [[] for _ in range(numCourses)]
    for c, p in prerequisites:
        adj[p].append(c)
        in_degree[c] += 1
    q = deque([i for i in range(numCourses) if in_degree[i] == 0])
    taken = 0
    while q:
        cur = q.popleft()
        taken += 1
        for nxt in adj[cur]:
            in_degree[nxt] -= 1
            if in_degree[nxt] == 0: q.append(nxt)
    return taken == numCourses`,
      java: `class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        int[] inDegree = new int[numCourses];
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        for (int[] p : prerequisites) {
            adj.get(p[1]).add(p[0]);
            inDegree[p[0]]++;
        }
        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) if (inDegree[i] == 0) q.add(i);
        int taken = 0;
        while (!q.isEmpty()) {
            int cur = q.poll();
            taken++;
            for (int nxt : adj.get(cur)) {
                if (--inDegree[nxt] == 0) q.add(nxt);
            }
        }
        return taken == numCourses;
    }
}`,
      cpp: `class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        vector<int> inDegree(numCourses, 0);
        vector<vector<int>> adj(numCourses);
        for (auto& p : prerequisites) {
            adj[p[1]].push_back(p[0]);
            inDegree[p[0]]++;
        }
        queue<int> q;
        for (int i = 0; i < numCourses; ++i) if (inDegree[i] == 0) q.push(i);
        int taken = 0;
        while (!q.empty()) {
            int cur = q.front(); q.pop();
            taken++;
            for (int nxt : adj[cur]) {
                if (--inDegree[nxt] == 0) q.push(nxt);
            }
        }
        return taken == numCourses;
    }
};`
    },
    testCases: [
      { input: { numCourses: 2, prerequisites: [[1, 0]] }, expected: true },
      { input: { numCourses: 2, prerequisites: [[1, 0], [0, 1]] }, expected: false }
    ],
    hints: ["Kahn's algorithm (Topological sort using in-degree queue)."],
    optimalComplexity: { time: "O(V + E)", space: "O(V + E)", notes: "Kahn's BFS topological sort." }
  },

  // 12. Backtracking
  {
    id: "prob-41",
    title: "Subsets",
    difficulty: "Medium",
    category: "Backtracking",
    acceptanceRate: "79%",
    functionName: "subsets",
    description: `Given an integer array \`nums\` of **unique** elements, return *all possible subsets (the power set)*.\n\nThe solution set **must not** contain duplicate subsets. Return the solution in **any order**.`,
    examples: [
      { input: "nums = [1,2,3]", output: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]" },
      { input: "nums = [0]", output: "[[],[0]]" }
    ],
    starterCode: {
      javascript: `function subsets(nums) {
  const res = [];
  function backtrack(start, current) {
    res.push([...current]);
    for (let i = start; i < nums.length; i++) {
      current.push(nums[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  }
  backtrack(0, []);
  return res;
}`,
      python: `def subsets(nums):
    res = []
    def backtrack(start, current):
        res.append(list(current))
        for i in range(start, len(nums)):
            current.append(nums[i])
            backtrack(i + 1, current)
            current.pop()
    backtrack(0, [])
    return res`,
      java: `class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        backtrack(nums, 0, new ArrayList<>(), res);
        return res;
    }
    void backtrack(int[] nums, int start, List<Integer> cur, List<List<Integer>> res) {
        res.add(new ArrayList<>(cur));
        for (int i = start; i < nums.length; i++) {
            cur.add(nums[i]);
            backtrack(nums, i + 1, cur, res);
            cur.remove(cur.size() - 1);
        }
    }
}`,
      cpp: `class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<vector<int>> res;
        vector<int> cur;
        backtrack(nums, 0, cur, res);
        return res;
    }
    void backtrack(const vector<int>& nums, int start, vector<int>& cur, vector<vector<int>>& res) {
        res.push_back(cur);
        for (int i = start; i < nums.size(); ++i) {
            cur.push_back(nums[i]);
            backtrack(nums, i + 1, cur, res);
            cur.pop_back();
        }
    }
};`
    },
    testCases: [
      { input: { nums: [1, 2, 3] }, expected: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]] },
      { input: { nums: [0] }, expected: [[], [0]] }
    ],
    hints: ["Backtracking branching on whether to include nums[i] or proceed."],
    optimalComplexity: { time: "O(n * 2^n)", space: "O(n)", notes: "Power set generation." }
  },
  {
    id: "prob-42",
    title: "Combination Sum",
    difficulty: "Medium",
    category: "Backtracking",
    acceptanceRate: "73%",
    functionName: "combinationSum",
    description: `Given an array of **distinct** integers \`candidates\` and a target integer \`target\`, return *a list of all **unique combinations** of \`candidates\` where the chosen numbers sum to \`target\`*.\n\nYou may return the combinations in **any order** and the same number may be chosen unlimited times.`,
    examples: [
      { input: "candidates = [2,3,6,7], target = 7", output: "[[2,2,3],[7]]" }
    ],
    starterCode: {
      javascript: `function combinationSum(candidates, target) {
  const res = [];
  function backtrack(start, remain, current) {
    if (remain === 0) { res.push([...current]); return; }
    if (remain < 0) return;
    for (let i = start; i < candidates.length; i++) {
      current.push(candidates[i]);
      backtrack(i, remain - candidates[i], current);
      current.pop();
    }
  }
  backtrack(0, target, []);
  return res;
}`,
      python: `def combination_sum(candidates, target):
    res = []
    def backtrack(start, remain, current):
        if remain == 0: res.append(list(current)); return
        if remain < 0: return
        for i in range(start, len(candidates)):
            current.append(candidates[i])
            backtrack(i, remain - candidates[i], current)
            current.pop()
    backtrack(0, target, [])
    return res`,
      java: `class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> res = new ArrayList<>();
        backtrack(candidates, 0, target, new ArrayList<>(), res);
        return res;
    }
    void backtrack(int[] c, int start, int remain, List<Integer> cur, List<List<Integer>> res) {
        if (remain == 0) { res.add(new ArrayList<>(cur)); return; }
        if (remain < 0) return;
        for (int i = start; i < c.length; i++) {
            cur.add(c[i]);
            backtrack(c, i, remain - c[i], cur, res);
            cur.remove(cur.size() - 1);
        }
    }
}`,
      cpp: `class Solution {
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        vector<vector<int>> res;
        vector<int> cur;
        backtrack(candidates, 0, target, cur, res);
        return res;
    }
    void backtrack(const vector<int>& c, int start, int remain, vector<int>& cur, vector<vector<int>>& res) {
        if (remain == 0) { res.push_back(cur); return; }
        if (remain < 0) return;
        for (int i = start; i < c.size(); ++i) {
            cur.push_back(c[i]);
            backtrack(c, i, remain - c[i], cur, res);
            cur.pop_back();
        }
    }
};`
    },
    testCases: [
      { input: { candidates: [2, 3, 6, 7], target: 7 }, expected: [[2, 2, 3], [7]] },
      { input: { candidates: [2], target: 1 }, expected: [] }
    ],
    hints: ["Pass current index i instead of i+1 to allow reusing the same candidate number."],
    optimalComplexity: { time: "O(2^t)", space: "O(t)", notes: "Backtracking recursion tree." }
  },
  {
    id: "prob-43",
    title: "Permutations",
    difficulty: "Medium",
    category: "Backtracking",
    acceptanceRate: "79%",
    functionName: "permute",
    description: `Given an array \`nums\` of distinct integers, return *all the possible permutations*. You can return the answer in **any order**.`,
    examples: [
      { input: "nums = [1,2,3]", output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]" }
    ],
    starterCode: {
      javascript: `function permute(nums) {
  const res = [];
  function backtrack(current, visited) {
    if (current.length === nums.length) { res.push([...current]); return; }
    for (let i = 0; i < nums.length; i++) {
      if (visited[i]) continue;
      visited[i] = true;
      current.push(nums[i]);
      backtrack(current, visited);
      current.pop();
      visited[i] = false;
    }
  }
  backtrack([], new Array(nums.length).fill(false));
  return res;
}`,
      python: `def permute(nums):
    res = []
    def backtrack(curr, visited):
        if len(curr) == len(nums): res.append(list(curr)); return
        for i in range(len(nums)):
            if not visited[i]:
                visited[i] = True
                curr.append(nums[i])
                backtrack(curr, visited)
                curr.pop()
                visited[i] = False
    backtrack([], [False] * len(nums))
    return res`,
      java: `class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        backtrack(nums, new ArrayList<>(), new boolean[nums.length], res);
        return res;
    }
    void backtrack(int[] nums, List<Integer> cur, boolean[] visited, List<List<Integer>> res) {
        if (cur.size() == nums.length) { res.add(new ArrayList<>(cur)); return; }
        for (int i = 0; i < nums.length; i++) {
            if (visited[i]) continue;
            visited[i] = true;
            cur.add(nums[i]);
            backtrack(nums, cur, visited, res);
            cur.remove(cur.size() - 1);
            visited[i] = false;
        }
    }
}`,
      cpp: `class Solution {
public:
    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> res;
        vector<int> cur;
        vector<bool> visited(nums.size(), false);
        backtrack(nums, cur, visited, res);
        return res;
    }
    void backtrack(const vector<int>& nums, vector<int>& cur, vector<bool>& visited, vector<vector<int>>& res) {
        if (cur.size() == nums.size()) { res.push_back(cur); return; }
        for (int i = 0; i < nums.size(); ++i) {
            if (visited[i]) continue;
            visited[i] = true;
            cur.push_back(nums[i]);
            backtrack(nums, cur, visited, res);
            cur.pop_back();
            visited[i] = false;
        }
    }
};`
    },
    testCases: [
      { input: { nums: [1, 2, 3] }, expected: [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]] },
      { input: { nums: [0, 1] }, expected: [[0, 1], [1, 0]] }
    ],
    hints: ["Use a boolean visited array to avoid picking the same element index twice."],
    optimalComplexity: { time: "O(n * n!)", space: "O(n)", notes: "Permutation tree." }
  },

  // 13. Advanced 2D Dynamic Programming
  {
    id: "prob-44",
    title: "Unique Paths",
    difficulty: "Medium",
    category: "2D Dynamic Programming",
    acceptanceRate: "73%",
    functionName: "uniquePaths",
    description: `There is a robot on an \`m x n\` grid. The robot is initially located at the **top-left corner** (\`grid[0][0]\`). The robot tries to move to the **bottom-right corner** (\`grid[m - 1][n - 1]\`). The robot can only move either down or right at any point in time.\n\nGiven the two integers \`m\` and \`n\`, return *the number of possible unique paths that the robot can take to reach the bottom-right corner*.`,
    examples: [
      { input: "m = 3, n = 7", output: "28" },
      { input: "m = 3, n = 2", output: "3" }
    ],
    starterCode: {
      javascript: `function uniquePaths(m, n) {
  const row = new Array(n).fill(1);
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      row[j] += row[j - 1];
    }
  }
  return row[n - 1];
}`,
      python: `def unique_paths(m: int, n: int) -> int:
    row = [1] * n
    for _ in range(1, m):
        for j in range(1, n):
            row[j] += row[j - 1]
    return row[-1]`,
      java: `class Solution {
    public int uniquePaths(int m, int n) {
        int[] row = new int[n];
        Arrays.fill(row, 1);
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                row[j] += row[j - 1];
            }
        }
        return row[n - 1];
    }
}`,
      cpp: `class Solution {
public:
    int uniquePaths(int m, int n) {
        vector<int> row(n, 1);
        for (int i = 1; i < m; ++i) {
            for (int j = 1; j < n; ++j) {
                row[j] += row[j - 1];
            }
        }
        return row.back();
    }
};`
    },
    testCases: [
      { input: { m: 3, n: 7 }, expected: 28 },
      { input: { m: 3, n: 2 }, expected: 3 }
    ],
    hints: ["dp[r][c] = dp[r-1][c] + dp[r][c-1]. Compress to 1D row array."],
    optimalComplexity: { time: "O(m * n)", space: "O(n)", notes: "1D space compressed DP." }
  },
  {
    id: "prob-45",
    title: "Longest Common Subsequence",
    difficulty: "Medium",
    category: "2D Dynamic Programming",
    acceptanceRate: "63%",
    functionName: "longestCommonSubsequence",
    description: `Given two strings \`text1\` and \`text2\`, return *the length of their longest **common subsequence**.* If there is no common subsequence, return \`0\`.`,
    examples: [
      { input: 'text1 = "abcde", text2 = "ace"', output: "3", explanation: 'The longest common subsequence is "ace" and its length is 3.' }
    ],
    starterCode: {
      javascript: `function longestCommonSubsequence(text1, text2) {
  const m = text1.length, n = text2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m][n];
}`,
      python: `def longest_common_subsequence(text1: str, text2: str) -> int:
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]: dp[i][j] = 1 + dp[i - 1][j - 1]
            else: dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[m][n]`,
      java: `class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length(), n = text2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1.charAt(i - 1) == text2.charAt(j - 1)) dp[i][j] = 1 + dp[i - 1][j - 1];
                else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
        return dp[m][n];
    }
}`,
      cpp: `class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        int m = text1.size(), n = text2.size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        for (int i = 1; i <= m; ++i) {
            for (int j = 1; j <= n; ++j) {
                if (text1[i - 1] == text2[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];
                else dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
        return dp[m][n];
    }
};`
    },
    testCases: [
      { input: { text1: "abcde", text2: "ace" }, expected: 3 },
      { input: { text1: "abc", text2: "abc" }, expected: 3 },
      { input: { text1: "abc", text2: "def" }, expected: 0 }
    ],
    hints: ["2D grid tabulation matching characters."],
    optimalComplexity: { time: "O(m * n)", space: "O(m * n)", notes: "2D dynamic programming grid." }
  },

  // 14. Additional Core Interview Practice Challenges (to 50)
  {
    id: "prob-46",
    title: "Palindrome Number",
    difficulty: "Easy",
    category: "Math",
    acceptanceRate: "93%",
    functionName: "isPalindromeNumber",
    description: `Given an integer \`x\`, return \`true\` *if* \`x\` *is a **palindrome**, and* \`false\` *otherwise*.`,
    examples: [
      { input: "x = 121", output: "true" },
      { input: "x = -121", output: "false" }
    ],
    starterCode: {
      javascript: `function isPalindromeNumber(x) {
  if (x < 0) return false;
  const s = x.toString();
  return s === s.split('').reverse().join('');
}`,
      python: `def is_palindrome_number(x: int) -> bool:
    if x < 0: return False
    return str(x) == str(x)[::-1]`,
      java: `class Solution {
    public boolean isPalindrome(int x) {
        if (x < 0 || (x % 10 == 0 && x != 0)) return false;
        int rev = 0;
        while (x > rev) {
            rev = rev * 10 + x % 10;
            x /= 10;
        }
        return x == rev || x == rev / 10;
    }
}`,
      cpp: `class Solution {
public:
    bool isPalindrome(int x) {
        if (x < 0 || (x % 10 == 0 && x != 0)) return false;
        int rev = 0;
        while (x > rev) {
            rev = rev * 10 + x % 10;
            x /= 10;
        }
        return x == rev || x == rev / 10;
    }
};`
    },
    testCases: [
      { input: { x: 121 }, expected: true },
      { input: { x: -121 }, expected: false },
      { input: { x: 10 }, expected: false }
    ],
    hints: ["Revert half of the number digits to avoid integer overflow."],
    optimalComplexity: { time: "O(log10 n)", space: "O(1)", notes: "Digit reversing." }
  },
  {
    id: "prob-47",
    title: "Roman to Integer",
    difficulty: "Easy",
    category: "Math & Hash Table",
    acceptanceRate: "89%",
    functionName: "romanToInt",
    description: `Given a roman numeral string \`s\`, convert it to an integer.`,
    examples: [
      { input: 's = "III"', output: "3" },
      { input: 's = "LVIII"', output: "58" },
      { input: 's = "MCMXCIV"', output: "1994" }
    ],
    starterCode: {
      javascript: `function romanToInt(s) {
  const map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const cur = map[s[i]], next = map[s[i + 1]];
    if (next && cur < next) { total -= cur; }
    else { total += cur; }
  }
  return total;
}`,
      python: `def roman_to_int(s: str) -> int:
    m = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}
    total = 0
    for i in range(len(s)):
        if i + 1 < len(s) and m[s[i]] < m[s[i+1]]: total -= m[s[i]]
        else: total += m[s[i]]
    return total`,
      java: `class Solution {
    public int romanToInt(String s) {
        Map<Character, Integer> map = Map.of('I', 1, 'V', 5, 'X', 10, 'L', 50, 'C', 100, 'D', 500, 'M', 1000);
        int total = 0;
        for (int i = 0; i < s.length(); i++) {
            int cur = map.get(s.charAt(i));
            if (i + 1 < s.length() && cur < map.get(s.charAt(i + 1))) total -= cur;
            else total += cur;
        }
        return total;
    }
}`,
      cpp: `class Solution {
public:
    int romanToInt(string s) {
        unordered_map<char, int> m = {{'I', 1}, {'V', 5}, {'X', 10}, {'L', 50}, {'C', 100}, {'D', 500}, {'M', 1000}};
        int total = 0;
        for (int i = 0; i < s.size(); ++i) {
            if (i + 1 < s.size() && m[s[i]] < m[s[i+1]]) total -= m[s[i]];
            else total += m[s[i]];
        }
        return total;
    }
};`
    },
    testCases: [
      { input: { s: "III" }, expected: 3 },
      { input: { s: "LVIII" }, expected: 58 },
      { input: { s: "MCMXCIV" }, expected: 1994 }
    ],
    hints: ["If current numeral value is less than next numeral, subtract it; otherwise add it."],
    optimalComplexity: { time: "O(n)", space: "O(1)", notes: "Linear scan with map." }
  },
  {
    id: "prob-48",
    title: "Longest Common Prefix",
    difficulty: "Easy",
    category: "String",
    acceptanceRate: "87%",
    functionName: "longestCommonPrefix",
    description: `Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string \`""\`.`,
    examples: [
      { input: 'strs = ["flower","flow","flight"]', output: '"fl"' },
      { input: 'strs = ["dog","racecar","car"]', output: '""' }
    ],
    starterCode: {
      javascript: `function longestCommonPrefix(strs) {
  if (!strs || strs.length === 0) return "";
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (prefix === "") return "";
    }
  }
  return prefix;
}`,
      python: `def longest_common_prefix(strs):
    if not strs: return ""
    prefix = strs[0]
    for s in strs[1:]:
        while not s.startswith(prefix):
            prefix = prefix[:-1]
            if not prefix: return ""
    return prefix`,
      java: `class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs == null || strs.length == 0) return "";
        String prefix = strs[0];
        for (int i = 1; i < strs.length; i++) {
            while (strs[i].indexOf(prefix) != 0) {
                prefix = prefix.substring(0, prefix.length() - 1);
                if (prefix.isEmpty()) return "";
            }
        }
        return prefix;
    }
}`,
      cpp: `class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        if (strs.empty()) return "";
        string prefix = strs[0];
        for (int i = 1; i < strs.size(); ++i) {
            while (strs[i].find(prefix) != 0) {
                prefix = prefix.substr(0, prefix.size() - 1);
                if (prefix.empty()) return "";
            }
        }
        return prefix;
    }
};`
    },
    testCases: [
      { input: { strs: ["flower", "flow", "flight"] }, expected: "fl" },
      { input: { strs: ["dog", "racecar", "car"] }, expected: "" }
    ],
    hints: ["Horizontal scanning comparing prefix with each word."],
    optimalComplexity: { time: "O(S)", space: "O(1)", notes: "S is sum of characters." }
  },
  {
    id: "prob-49",
    title: "Plus One",
    difficulty: "Easy",
    category: "Array & Math",
    acceptanceRate: "89%",
    functionName: "plusOne",
    description: `You are given a **large integer** represented as an integer array \`digits\`, where each \`digits[i]\` is the \`i-th\` digit of the integer. The digits are ordered from most significant to least significant in left-to-right order.\n\nIncrement the large integer by one and return *the resulting array of digits*.`,
    examples: [
      { input: "digits = [1,2,3]", output: "[1,2,4]" },
      { input: "digits = [9]", output: "[1,0]" }
    ],
    starterCode: {
      javascript: `function plusOne(digits) {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) {
      digits[i]++;
      return digits;
    }
    digits[i] = 0;
  }
  digits.unshift(1);
  return digits;
}`,
      python: `def plus_one(digits):
    for i in range(len(digits) - 1, -1, -1):
        if digits[i] < 9:
            digits[i] += 1
            return digits
        digits[i] = 0
    return [1] + digits`,
      java: `class Solution {
    public int[] plusOne(int[] digits) {
        for (int i = digits.length - 1; i >= 0; i--) {
            if (digits[i] < 9) {
                digits[i]++;
                return digits;
            }
            digits[i] = 0;
        }
        int[] res = new int[digits.length + 1];
        res[0] = 1;
        return res;
    }
}`,
      cpp: `class Solution {
public:
    vector<int> plusOne(vector<int>& digits) {
        for (int i = digits.size() - 1; i >= 0; --i) {
            if (digits[i] < 9) {
                digits[i]++;
                return digits;
            }
            digits[i] = 0;
        }
        digits.insert(digits.begin(), 1);
        return digits;
    }
};`
    },
    testCases: [
      { input: { digits: [1, 2, 3] }, expected: [1, 2, 4] },
      { input: { digits: [4, 3, 2, 1] }, expected: [4, 3, 2, 2] },
      { input: { digits: [9] }, expected: [1, 0] }
    ],
    hints: ["Iterate backwards. If digit < 9 add 1 and return; otherwise carry over."],
    optimalComplexity: { time: "O(n)", space: "O(1)", notes: "Linear carry traversal." }
  },
  {
    id: "prob-50",
    title: "Sqrt(x)",
    difficulty: "Easy",
    category: "Binary Search & Math",
    acceptanceRate: "88%",
    functionName: "mySqrt",
    description: `Given a non-negative integer \`x\`, return *the square root of* \`x\` *rounded down to the nearest integer*. The returned integer should be **non-negative** as well.\n\nYou **must not use** any built-in exponent function or operator.`,
    examples: [
      { input: "x = 4", output: "2" },
      { input: "x = 8", output: "2", explanation: "The square root of 8 is 2.82842..., and since we round it down, 2 is returned." }
    ],
    starterCode: {
      javascript: `function mySqrt(x) {
  if (x < 2) return x;
  let left = 1, right = Math.floor(x / 2);
  let ans = 1;
  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);
    if (mid * mid === x) return mid;
    else if (mid * mid < x) {
      ans = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return ans;
}`,
      python: `def my_sqrt(x: int) -> int:
    if x < 2: return x
    left, right = 1, x // 2
    ans = 1
    while left <= right:
        mid = (left + right) // 2
        if mid * mid == x: return mid
        elif mid * mid < x:
            ans = mid
            left = mid + 1
        else:
            right = mid - 1
    return ans`,
      java: `class Solution {
    public int mySqrt(int x) {
        if (x < 2) return x;
        long left = 1, right = x / 2, ans = 1;
        while (left <= right) {
            long mid = left + (right - left) / 2;
            if (mid * mid == x) return (int) mid;
            else if (mid * mid < x) { ans = mid; left = mid + 1; }
            else right = mid - 1;
        }
        return (int) ans;
    }
}`,
      cpp: `class Solution {
public:
    int mySqrt(int x) {
        if (x < 2) return x;
        long left = 1, right = x / 2, ans = 1;
        while (left <= right) {
            long mid = left + (right - left) / 2;
            if (mid * mid == x) return mid;
            else if (mid * mid < x) { ans = mid; left = mid + 1; }
            else right = mid - 1;
        }
        return ans;
    }
};`
    },
    testCases: [
      { input: { x: 4 }, expected: 2 },
      { input: { x: 8 }, expected: 2 },
      { input: { x: 0 }, expected: 0 }
    ],
    hints: ["Binary search range [1, x // 2]."],
    optimalComplexity: { time: "O(log x)", space: "O(1)", notes: "Binary search integer square root." }
  }
];
