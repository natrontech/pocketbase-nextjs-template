package util_test

import (
	"testing"

	"github.com/natrongmbh/pocketbase-nextjs-template/pkg/util"
)

func TestRandomStringBytes(t *testing.T) {
	valid_tests := []struct {
		description string
		input       int
	}{
		{
			description: "Test with input 30",
			input:       30,
		},
		{
			description: "Test with non integer input",
			input:       10,
		},
	}

	var results []string

	for _, test := range valid_tests {
		t.Run(test.description, func(t *testing.T) {
			// check if output length is equal to input
			randomString := util.RandomStringBytes(test.input)
			if len(randomString) != test.input {
				t.Errorf("Expected length of random string to be %d, got %d", test.input, len(randomString))
			}

			results = append(results, randomString)
		})
	}

	// check if all results are unique
	for i := 0; i < len(results); i++ {
		for j := i + 1; j < len(results); j++ {
			if results[i] == results[j] {
				t.Errorf("Expected all results to be unique, got %s and %s", results[i], results[j])
			}
		}
	}
}
